<script setup lang=ts>
import type { Post } from '~/types';

const id = useRoute().params.id
const postStore = usePostStore();

const { data, pending } = await useFetch<Post>(`/api/post/${id}`, { method: 'GET' })

const post = computed(() => data.value ?? {
  id: 0,
  title: '',
  content: '',
  createdDate: '',
  categoryTitle: '',
  tags: [''],
})

postStore.post = post.value

useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.content.replace(/<[^>]*>?/gm, '') },
    { name: 'keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'title', content: post.value.title }
  ]
})
</script>
<template>
  <div>
    <PostDetail />
    <TheLoader :is-pending="pending" />
  </div>
</template>

<style lang='scss' scoped></style>