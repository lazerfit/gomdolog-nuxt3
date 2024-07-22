<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
const store = usePostStore();
const { $api } = useNuxtApp();
const param = useRoute().params;

const { data, error } = await useAsyncData(() => $api.post.fetchAllByTitleSlice(param.title, '0'));

if (error.value) {
  console.log(error.value);
}

const post = computed(() => data.value ?? {
  content: [],
  numberOfElements: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  first: false,
  last: false,
  number: 0,
})
store.postsPage = post.value;

useHead({
  title: param.title
})

</script>
<template>
  <div>
    <TheBanner :is-mobile="mobile" />
    <PostAll :is-searched-by="true" :search-param=param.title />
    <LazyPaginationForMobile :api-base="`search`" :title="param.title" />
  </div>
</template>

<style lang='scss' scoped></style>