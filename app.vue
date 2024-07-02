<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useHeaderStore } from './stores/header';

const headerStore = useHeaderStore();

const setPreferredColorScheme = () => {
  if (localStorage.getItem('darkMode') && localStorage.getItem('darkMode') === 'true') {
    headerStore.isDarkMode = true;
    document.body.classList.add('darkMode');
  } else {
    headerStore.isDarkMode = false;
    document.body.classList.remove('darkMode');
  }
}

onBeforeMount(() => {
  setPreferredColorScheme();
})
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>