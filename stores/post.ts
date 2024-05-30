import { defineStore, acceptHMRUpdate } from 'pinia'
import type { PostPageResponseWithoutTags, PostSave, PostUpdate } from '~/types';

export const usePostStore = defineStore('post', () => {
  const postsPage = ref<PostPageResponseWithoutTags | null>(null);
  const pageSize = ref(6);
  const postSaveForm = ref<PostSave>({
    title: '',
    content: '',
    categoryTitle: '',
    tags: []
  });

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  return {postsPage, pageSize, formatDate, postSaveForm}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
