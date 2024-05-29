import { defineStore, acceptHMRUpdate } from 'pinia'
import type { PostPageResponseWithoutTags } from '~/types';

export const usePostStore = defineStore('post', () => {
  const postsPage = ref<PostPageResponseWithoutTags | null>(null);
  const pageSize = ref(6);

  return {postsPage, pageSize}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
