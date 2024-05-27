<script setup lang=ts>
const id = useRoute().params.id as string

useHead({
  title: 'gomdolog | post',
  meta: [
    { name: 'description', content: 'post description' },
    { name: 'og:description', content: 'post description' },
    { name: 'og:keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'og:title', content: 'gomdolog | post' }
  ]
})

const { data: post } = useFetch('http://localhost:8080/post/1');
</script>
<template>
  <div>
    <h1>Post details for {{ id }}</h1>
  </div>
  <div>
    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>

<style lang='scss' scoped></style>