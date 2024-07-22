<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
const param = useRoute().params;
const { fetchAllByCategoryTitle } = usePostStore();

await fetchAllByCategoryTitle(param.title, '0');

useHead({
  title: param.title,
})
</script>
<template>
  <div>
    <TheBanner :is-mobile="mobile" />
    <PostAll :is-searched-by="true" :search-param="param.title" />
    <LazyPaginationForMobile :api-base="`category`" :title="param.title" />
  </div>
</template>

<style lang='scss' scoped></style>