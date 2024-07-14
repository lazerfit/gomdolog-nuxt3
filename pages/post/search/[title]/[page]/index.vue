<script setup lang=ts>
const { fetchAllByTitle } = usePostStore();
const param = useRoute().params;

await fetchAllByTitle(param.title, param.page);

useHead({
  title: param.title
})

</script>
<template>
  <div>
    <TheBanner />
    <PostAll :is-searched-by="true" :search-param=param.title />
    <PaginationForSearch :nuxt-link-base="`/post/search`" />
  </div>
</template>

<style lang='scss' scoped></style>