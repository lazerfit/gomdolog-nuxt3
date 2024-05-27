import { defineStore, acceptHMRUpdate } from 'pinia'

export const useHeaderStore = defineStore('header', () => {
  const isAdmin = ref(false);
  const isModalOpened = ref(false);
  const isAdminMenuOpened = ref(false);
  const isDarkMode = ref(false);

  function darkModeToggle() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
  }

  function setDarkMode() {
    const savedSetting = localStorage.getItem('darkMode');
    if (savedSetting === 'true') {
      isDarkMode.value = true;
    } else {
      isDarkMode.value = false;
    }
  }

  function setLoginStatus() {
    if (sessionStorage.getItem('userRole') === null || sessionStorage.getItem('useRole') === 'USER') {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }
  }

  return {
    isAdmin, 
    isModalOpened, 
    isAdminMenuOpened, 
    isDarkMode, 
    darkModeToggle, 
    setDarkMode, 
    setLoginStatus,
  }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useHeaderStore, import.meta.hot))
}
