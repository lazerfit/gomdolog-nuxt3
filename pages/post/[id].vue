<script setup lang=ts>
import type { PostDetail } from '~/types';

const postId = useRoute().params.id
const postStore = usePostStore();
const { fetchById } = usePostStore();

await fetchById(postId);

useHead({
  title: postStore.post.title,
  meta: [
    { name: 'description', content: postStore.post.content.replace(/<[^>]*>?/gm, '') },
    { name: 'keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'title', content: postStore.post.title }
  ]
})
</script>
<template>
  <div>
    <PostDetail />
  </div>
</template>

<style lang='scss' scoped></style>