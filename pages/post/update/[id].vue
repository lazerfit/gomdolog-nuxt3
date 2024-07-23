<script setup lang=ts>
const id = useRoute().params.id;
const { fetchUpdateForm } = usePostStore();
await fetchUpdateForm(id);
</script>
<template>
  <div>
    <PostSave :is-update="true" />
  </div>
</template>

<style lang='scss' scoped></style>