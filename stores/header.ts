import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

export interface SigninForm {
  email: string;
  password: string;
}

export const useHeaderStore = defineStore('header', () => {
  const isAdmin = ref(false);
  const isModalOpened = ref(false);
  const isAdminMenuOpened = ref(false);
  const isDarkMode = ref(false);
  const signinForm = ref<SigninForm>({
    email: '',
    password: ''
  });

  function darkModeToggle() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
    if (isDarkMode.value) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
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
      isAdmin.value = false;
    } else {
      isAdmin.value = true;
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
    signinForm,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHeaderStore, import.meta.hot))
}
