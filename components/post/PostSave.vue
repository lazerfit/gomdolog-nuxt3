<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import type { Category } from "~/types";
import TiptapEditor from './TiptapEditor.vue';
import TagInput from './TagInput.vue';

const store = usePostStore();

const submitSavePost = () => {
  localStorage.removeItem('draft')
}

const { data: rawCategories } = await useFetch<Category[]>('/api/category/all');
const categories = computed(() => rawCategories.value ?? []);

const loadDraft = () => {
  if (localStorage.getItem('draft')) {
    if (window.confirm('임시저장된 게시글이 존재합니다. 불러오시겠습니까?')) {
      const draftToString = localStorage.getItem('draft') || '';
      const draft = JSON.parse(draftToString);
      store.postSaveForm = draft
    }
  }
}

const saveDraft = () => {
  localStorage.setItem('draft', JSON.stringify(store.postSaveForm));
  console.log('Draft saved');
}

const timer = setInterval(() => saveDraft(), 30 * 1000)

onBeforeMount(() => {
  loadDraft();
  timer
})

onUnmounted(() => {
  clearInterval(timer);
})

</script>

<template>
  <div class="tip-tap-container">
    <div class="tip-tap-submit">
      <div class="tip-tap-category-wrapper">
        <select name="category" id="post-category" v-model="store.postSaveForm.categoryTitle">
          <option value="" selected>카테고리</option>
          <option :value="item.title" v-for="item in categories" :key="item.id">{{ item.title }}</option>
        </select>
      </div>
      <input type="text" placeholder="제목을 입력해주세요." class="tip-tap-post-title" v-model="store.postSaveForm.title">
      <tiptap-editor />
      <div class="tip-tap-tag-submit">
        <tag-input v-model="store.postSaveForm.tags" />
        <div class="tip-tap-submit">
          <button @click="submitSavePost">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip-tap-container {
  width: px-to-rem(900);
  margin: px-to-rem(60) auto;

  @media (max-width: 767px) {
    width: 100%;
    margin: 35px 0 20px 0;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  #post-category {
    margin-bottom: px-to-rem(17);
    border-radius: px-to-rem(8);
    border: 1px solid $light-black;
    padding: px-to-rem(5);
    color: $silver-black;
    font-family: $secondary-font;
  }

  .tip-tap-post-title {
    width: 100%;
    margin-bottom: px-to-rem(17);
    height: px-to-rem(40);
    border-radius: px-to-rem(10);
    border: 1px solid $light-black;
    padding: px-to-rem(10);
    box-sizing: border-box;
    font-family: $secondary-font;

    &::placeholder {
      padding-left: px-to-rem(1);
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
    margin-top: px-to-rem(17);

    .tip-tap-submit {
      button {
        border: none;
        background-color: #ff793f;
        cursor: pointer;
        font-family: $secondary-font;
        padding: px-to-rem(7);
        border-radius: px-to-rem(5);
        color: $pearl;
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