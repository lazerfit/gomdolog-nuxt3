<script setup lang=ts>
const route = useRoute();
</script>
<template>
  <div>
    <TheBanner />
    <PostAll :is-searched-by="true" :search-param="route.params.title" />
  </div>
</template>

<style lang='scss' scoped></style>