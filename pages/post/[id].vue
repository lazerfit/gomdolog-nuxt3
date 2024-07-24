<script setup lang=ts>
definePageMeta({
  middleware: ['add-views']
})

const postId = useRoute().params.id;
const { fetchById } = usePostStore();

await fetchById(postId);

</script>
<template>
  <div>
    <PostDetail />
  </div>
</template>

<style lang='scss' scoped></style>