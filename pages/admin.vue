<script setup lang=ts>
definePageMeta({
  middleware: ['auth']
})
</script>
<template>
  <div>
    <AdminDashboard />
  </div>
</template>

<style lang='scss' scoped></style>