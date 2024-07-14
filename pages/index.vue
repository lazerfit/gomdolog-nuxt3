<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
const { fetchAll } = usePostStore();

await fetchAll();

const isExpired = () => {
  if (localStorage.getItem('visitedPostCreatedAt')) {
    const storedCreatedAt = parseInt(localStorage.getItem('visitedPostCreatedAt') || '0');
    return Date.now() - storedCreatedAt >= 24 * 60 * 60 * 1000
  }
}

const currentComponent = computed(() => {
  return mobile.value ? resolveComponent('PaginationForMobile') : resolveComponent('ThePagination')
});
const currentProps = computed(() => {
  return mobile.value ? { isMobile: true, apiBase: '/post/all' } : { isIndex: true }
})

onBeforeMount(async () => {
  if (!localStorage.getItem('visitedPost')) {
    localStorage.setItem('visitedPost', JSON.stringify([]))
    localStorage.setItem('visitedPostCreatedAt', Date.now().toString())
  }

  if (isExpired()) {
    localStorage.removeItem('visitedPost')
    localStorage.setItem('visitedPostCreatedAt', Date.now().toString())
  }
})

</script>
<template>
  <div>
    <LazyTheBanner :is-mobile="mobile" />
    <PostPopular />
    <PostAll :is-searched-by="false" />
    <component :is="currentComponent" v-bind="currentProps" />
  </div>
</template>

<style lang='scss' scoped></style>