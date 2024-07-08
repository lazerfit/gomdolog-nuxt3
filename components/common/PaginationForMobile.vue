<script setup lang=ts>
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');
</script>
<template>
  <div class="wrapper">
    <div v-if="mobile" class="mobile-pagination">
      Mobile show
    </div>
  </div>
</template>

<style lang='scss' scoped></style>