<script setup lang=ts>
import { clearError } from 'nuxt/app';

defineProps(['error'])

const handleClearError = () => {
  clearError();
  window.location.href = '/';
}
</script>
<template>
  <div class="container">
    <div class="content-wrapper">
      <p>{{ error.statusCode }}</p>
      <p>{{ error.message }}</p>
      <button @click="handleClearError">Back home</button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.container {
  font-family: $sans;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .content-wrapper {
    width: 400px;
    height: 600px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    border-radius: rem(20);

    p {
      &:first-child {
        font-size: 10rem;
        font-weight: bold;
      }

      &:nth-child(2) {
        font-size: 1.4rem;
        font-weight: 400;
      }
    }

    button {
      @include button-primary
    }
  }
}
</style>