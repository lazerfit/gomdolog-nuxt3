<script setup lang=ts>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
<template>
  <div>
    <SpeedInsights />
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>

<style lang='scss' scoped></style>