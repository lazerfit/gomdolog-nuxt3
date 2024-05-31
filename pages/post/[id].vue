<script setup lang=ts>
const id = useRoute().params.id

useHead({
  meta: [
    { name: 'description', content: 'post description' },
    { name: 'og:description', content: 'post description' },
    { name: 'og:keyword', content: 'spring, java, vue.js, nuxt' },
    { name: 'og:title', content: 'gomdolog | post' }
  ]
})

</script>
<template>
  <PostDetail />
</template>

<style lang='scss' scoped></style>