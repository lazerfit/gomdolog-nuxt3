<script setup lang=ts>
import type { Category } from '~/types';
const { data: rawCategories } = useFetch<Category[]>('/api/category/all', {
  method: 'GET',
})
const categories = computed(() => rawCategories.value ?? [])
const filteredCategory = computed(() => categories.value.filter(category => category.title !== '없음'))

</script>
<template>
  <div class="category-container">
    <NuxtLink v-for="(item, index) in filteredCategory" :key="index" :to="`/category/${item.title}/0`" class="category">
      {{ item.title }}
    </NuxtLink>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .category {
    background-color: $font-white !important;
  }
}

.category-container {
  width: 1000px;
  height: 50px;
  margin: rem(10) auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 767px) {
    display: none;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  .category {
    font-family: $sans;
    max-width: rem(100);
    text-align: center;
    border-radius: rem(10);
    padding: rem(5) rem(10);
    cursor: pointer;
    box-shadow: 5px 5px 20px rgba($color: #333, $alpha: .17);
    overflow: hidden;
    transition: all .3s ease;

    @media (min-width:768px) and (max-width: 1024px) {
      width: 140px;

      &:nth-child(1) {
        background-color: #FFDA79;
        border: none;
        color: #FF793F;
        @include box-shadow-animation(#ccae62);
      }

      &:nth-child(2) {
        background-color: #34ace075;
        border: none;
        color: #227093;
        @include box-shadow-animation(#226f938c);
      }

      &:nth-child(3) {
        background-color: #716fd369;
        border: none;
        color: #706FD3;
        @include box-shadow-animation(#47478788);
      }

      &:nth-child(4) {
        background-color: #33d9b26e;
        border: none;
        color: #218C74;
        @include box-shadow-animation(#218c758a);
      }

      &:nth-child(5) {
        background-color: #ff525277;
        border: none;
        color: #B33939;
        @include box-shadow-animation(#b339398e);
      }
    }

    &:nth-child(1):hover {
      @include box-shadow-animation(#ccae62);
    }

    &:nth-child(2):hover {
      @include box-shadow-animation(#226f938c);
    }

    &:nth-child(3):hover {
      @include box-shadow-animation(#47478788);
    }

    &:nth-child(4):hover {
      @include box-shadow-animation(#218c758a);
    }

    &:nth-child(5):hover {
      @include box-shadow-animation(#b339398e);
    }
  }

  .category:nth-child(1) {
    background-color: #FFDA79;
    border: none;
    color: #FF793F;
  }

  .category:nth-child(2) {
    background-color: #34ace075;
    border: none;
    color: #227093;
  }

  .category:nth-child(3) {
    background-color: #716fd369;
    border: none;
    color: #706FD3;
  }

  .category:nth-child(4) {
    background-color: #33d9b26e;
    border: none;
    color: #218C74;
  }

  .category:nth-child(5) {
    background-color: #ff525277;
    border: none;
    color: #B33939;
  }
}
</style>