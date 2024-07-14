<script setup lang=ts>
const param = useRoute().params;
const { fetchAllByCategoryTitle } = usePostStore();

await fetchAllByCategoryTitle(param.title, param.page);

useHead({
  title: param.title,
})
</script>
<template>
  <div>
    <TheBanner />
    <PostAll :is-searched-by="true" :search-param="param.title" />
    <PaginationForSearch :nuxt-link-base="`/category`" />
  </div>
</template>

<style lang='scss' scoped></style>