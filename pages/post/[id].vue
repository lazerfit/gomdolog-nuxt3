<script setup lang=ts>
const id = useRoute().params.id
import type { Post } from '~/types';

useHead({
  title: 'gomdolog | post',
  meta: [
    { name: 'description', content: 'post description' },
    { name: 'og:description', content: 'post description' },
    { name: 'og:keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'og:title', content: 'gomdolog | post' }
  ]
})

defineOptions({
  name: 'post-detail'
})

const { data: post } = await useFetch<Post>(`/api/post/${id}`, {
  method: 'GET'
});

</script>
<template>
  <div>
    <div>
      <h1>Post details for {{ id }}</h1>
    </div>
    <div>
      {{ post?.title }}
    </div>
    <div>
      <NuxtLink to="/">Back</NuxtLink>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>