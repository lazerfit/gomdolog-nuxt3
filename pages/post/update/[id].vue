<script setup lang=ts>
import type { Category, Post } from '~/types';

definePageMeta({
  middleware: ['auth']
})

const store = usePostStore();
const { id } = useRoute().params;
const token = sessionStorage.getItem('_token');
const config = useRuntimeConfig();
const toastStore = useCommonStore();

const { data: rawCategories } = await useFetch<Category[]>('/api/category/all');
const categories = computed(() => {
  return rawCategories.value?.filter(category => category.title !== '없음') ?? []
})

const { data: rawPost } = await useFetch<Post>(`/api/post/${id}`)
const post = computed(() => rawPost.value ?? {
  id: 0,
  title: '',
  content: '',
  createdDate: '',
  thumbnail: '',
  categoryTitle: '',
  tags: []
})
store.postSaveForm = post.value;

const UPDATE_POST = () => {
  $fetch(`${config.public.apiBase}/post/update`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: {
      id: useRoute().params.id,
      title: store.postSaveForm.title,
      content: store.postSaveForm.content,
      categoryTitle: store.postSaveForm.categoryTitle,
      tags: store.postSaveForm.tags
    }
  }).then(() => {
    useRouter().push('/');
  }).catch(error => {
    console.log(error);
    toastStore.setToast('업데이트에 실패하였습니다.', 'error');
  })
  localStorage.removeItem('draft')
}

</script>
<template>
  <div class="tip-tap-container">
    <div class="tip-tap-submit">
      <div class="tip-tap-category-wrapper">
        <select id="post-category" v-model="store.postSaveForm.categoryTitle" name="category">
          <option value="" selected>카테고리</option>
          <option v-for="item in categories" :key="item.id" :value="item.title">{{ item.title }}</option>
        </select>
      </div>
      <input v-model="store.postSaveForm.title" type="text" placeholder="제목을 입력해주세요." class="tip-tap-post-title">
      <TiptapEditor />
      <div class="tip-tap-tag-submit">
        <tag-input v-model="store.postSaveForm.tags" />
        <div class="tip-tap-submit">
          <button @click="UPDATE_POST">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.tip-tap-container {
  width: rem(900);
  margin: rem(60) auto;

  @media (max-width: 767px) {
    width: 100%;
    margin: 35px 0 20px 0;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  #post-category {
    margin-bottom: rem(17);
    border-radius: rem(8);
    border: 1px solid $light-black;
    padding: rem(5);
    color: $silver-black;
    font-family: $sans;
  }

  .tip-tap-post-title {
    width: 100%;
    margin-bottom: rem(17);
    height: rem(40);
    border-radius: rem(10);
    border: 1px solid $light-black;
    padding: rem(10);
    box-sizing: border-box;
    font-family: $sans;

    &::placeholder {
      padding-left: rem(1);
      transition: all .3s ease;
    }

    &:focus::placeholder {
      opacity: 0;
    }

    &:focus {
      outline: none;
    }
  }

  .tip-tap-tag-submit {
    display: flex;
    justify-content: space-between;
    margin-top: rem(17);

    .tip-tap-submit {
      button {
        border: none;
        background-color: #ff793f;
        cursor: pointer;
        font-family: $sans;
        padding: rem(7);
        border-radius: rem(5);
        color: $font-white;
        transition: all .5s ease;

        &:hover {
          transform: translate(-5px, -5px);
          box-shadow: 3px 3px #cd6133;
        }

      }
    }
  }
}
</style>