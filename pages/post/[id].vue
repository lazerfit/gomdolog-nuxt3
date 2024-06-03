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
    <div v-if="pending">
      <TheLoader />
    </div>
  </div>
</template>

<style lang='scss' scoped></style>