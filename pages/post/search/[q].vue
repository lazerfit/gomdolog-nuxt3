<script setup lang=ts>
const store = usePostStore();
const query = useRoute().params.q
const data = await useFetch(`/api/post/search/${query}`);
store.postsPage = data.data.value;
</script>
<template>
  <div>
    <TheBanner />
    <PostAll :is-searched-by="true" :search-param=query />
  </div>
</template>

<style lang='scss' scoped></style>