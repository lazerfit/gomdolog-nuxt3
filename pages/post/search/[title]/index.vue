<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
const { fetchAllByTitle } = usePostStore();
const param = useRoute().params;

await fetchAllByTitle(param.title, param.page);

useHead({
  title: param.title
})

</script>
<template>
  <div>
    <TheBanner :is-mobile="mobile" />
    <PostAll :is-searched-by="true" :search-param=param.title />
    <LazyPaginationForMobile :is-mobile="mobile" :api-base="`/post/search`" :title="param.title" />
  </div>
</template>

<style lang='scss' scoped></style>