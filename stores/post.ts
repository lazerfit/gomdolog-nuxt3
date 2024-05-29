import { defineStore, acceptHMRUpdate } from 'pinia'
import type { PostPageResponseWithoutTags } from '~/types';

export const usePostStore = defineStore('post', () => {
  const postsPage = ref<PostPageResponseWithoutTags | null>(null);
 
  return {postsPage}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
