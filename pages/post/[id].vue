<script setup lang=ts>
import type { Post } from '~/types';

const id = useRoute().params.id
const postStore = usePostStore();


const data = await useFetch<Post>(`/api/post/${id}`, { method: 'GET' })

const post = computed(() => data.data.value ?? {
  id: 0,
  title: '',
  content: '',
  createdDate: '',
  categoryTitle: '',
  tags: [''],
})

postStore.post = post.value

useHead({
  meta: [
    { name: 'description', content: post.value.content.replace(/<[^>]*>?/gm, '') },
    { name: 'keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'title', content: post.value.title }
  ]
})
</script>
<template>
  <PostDetail />
</template>

<style lang='scss' scoped></style>