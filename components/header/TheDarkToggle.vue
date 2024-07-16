<script setup lang=ts>
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'darkMode',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="container">
    <button @click="toggleDark()">
      {{ isDark ? 'Dark' : 'Light' }}
    </button>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  button {
    border: 2px solid $background-color !important;
    color: $font-black !important;
    background-color: $background-color;
  }
}

button {

  padding: rem(3) rem(5);
  background-color: transparent;
  border: 2px solid $font-black;
  border-radius: rem(10);
  font-family: $pretendard;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  margin-right: rem(5);
  color: $font-white;
  background-color: $font-black;

  @media (max-width: 767px) {
    padding: rem(3);
    font-size: 0.8rem;
    border-radius: rem(5);
    margin-right: rem(3);
  }
}
</style>