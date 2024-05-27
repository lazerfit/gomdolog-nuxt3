<script setup lang=ts>
const store = useHeaderStore();
onBeforeMount(() => {
  store.setDarkMode();
})

onBeforeUnmount(() => {
  store.isAdmin = false;
})
</script>
<template>
  <div>

  </div>
</template>

<style lang='scss' scoped></style>