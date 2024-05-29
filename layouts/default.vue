<script setup lang=ts>
const store = useHeaderStore();
</script>
<template>
  <div>
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>

<style lang='scss' scoped></style>