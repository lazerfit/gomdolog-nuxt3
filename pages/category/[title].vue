<script setup lang=ts>
const route = useRoute();
</script>
<template>
  <div>
    <TheBanner />
    <PostAll :isSearchedBy="true" :searchParam="route.params.title" />
  </div>
</template>

<style lang='scss' scoped></style>