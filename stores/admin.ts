import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Category } from '~/types';

export const useAdminStore = defineStore('admin', () => {
  const isCategoryShow = ref(false);
  const isDashboardShow = ref(true);
  const isRecycleBinShow = ref(false);
  const isUserShow = ref(false);
  
  const categories = ref<Category[]>([]);
  const divList = ref<{ inputValue: string }[]>([]);
  const updateTitle = ref('');


  return {isCategoryShow, isDashboardShow, isRecycleBinShow, isUserShow, categories, divList, updateTitle}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
