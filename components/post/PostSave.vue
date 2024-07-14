<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import TiptapEditor from './TiptapEditor.client.vue';
import TagInput from './TagInput.client.vue';

const store = usePostStore();
const { save, fetchAllCategory } = usePostStore();

const categories = await fetchAllCategory();

const loadDraft = () => {
  if (localStorage.getItem('draft')) {
    if (window.confirm('임시저장된 게시글이 존재합니다. 불러오시겠습니까?')) {
      const draftToString = localStorage.getItem('draft') || '';
      const draft = JSON.parse(draftToString);
      store.postSaveForm = draft;
    }
  }
};

const saveDraft = () => {
  localStorage.setItem('draft', JSON.stringify(store.postSaveForm));
  console.log('Draft saved');
};

const timer = setInterval(() => saveDraft(), 30 * 1000);

onBeforeMount(() => {
  loadDraft();
  timer;
});

onUnmounted(() => {
  clearInterval(timer);
});
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
        <TagInput v-model="store.postSaveForm.tags" />
        <div class="tip-tap-submit">
          <button @click="save">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.darkMode {
  .tip-tap-container {
    background-color: transparent;
    color: $font-white;

    #post-category {
      color: $font-white;
    }

    .tip-tap-post-title {
      color: $font-white;

      &::placeholder {
        color: $font-white;
      }
    }
  }
}

.tip-tap-container {
  width: rem(900);
  margin: rem(60) auto;
  background-color: #f9f9f9;

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
    border: 1px solid #999;
    padding: rem(5);
    color: #777;
    font-family: $sans;
    background-color: transparent;
  }

  .tip-tap-post-title {
    width: 100%;
    margin-bottom: rem(17);
    height: rem(40);
    border-radius: rem(10);
    border: 1px solid #999;
    padding: rem(10);
    box-sizing: border-box;
    font-family: $sans;
    background-color: transparent;

    &::placeholder {
      padding-left: rem(1);
      transition: all .3s ease;
      font-family: $sans;
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