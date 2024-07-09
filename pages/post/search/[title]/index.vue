<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
const store = usePostStore();
const param = useRoute().params;

const { data, error } = await useFetch(`/api/post/search`, {
  params: {
    title: param.title,
    page: 0,
    size: 9
  }
});

useHead({
  title: param.title
})

if (error.value?.statusCode === 404) {
  showError({ statusCode: error.value.statusCode, statusMessage: error.value.statusMessage, message: 'page not found' })
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

</script>
<template>
  <div>
    <TheBanner :is-mobile="mobile" />
    <PostAll :is-searched-by="true" :search-param=param.title />
    <LazyPaginationForMobile :is-mobile="mobile" :api-base="`/post/search`" :title="param.title" />
  </div>
</template>

<style lang='scss' scoped></style>