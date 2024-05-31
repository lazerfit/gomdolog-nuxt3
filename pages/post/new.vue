<script setup lang=ts>
definePageMeta({
  middleware: ['auth']
})
</script>
<template>
  <div>
    <PostSave />
  </div>
</template>

<style lang='scss' scoped></style>