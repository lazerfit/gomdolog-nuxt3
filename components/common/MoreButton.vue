<script setup lang=ts>
import { computed } from 'vue';
import type { PostPageResponseWithoutTags } from "~/types";
const store = usePostStore();

watchEffect(async () => {
  if (store.pageSize > 6) {
    const data = await $fetch<PostPageResponseWithoutTags>('/api/post/all', {
      params: {
        size: store.pageSize
      }
    })
    store.postsPage = data
  }
})

const hasNextPage = computed(() => (store?.postsPage?.size || 0) > (store?.postsPage?.numberOfElements || 0))

</script>
<template>
  <div class="container">
    <button v-if="!hasNextPage" @click="store.pageSize += 6">More Posts</button>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  button {
    background-color: $font-white !important;
    color: $font-black !important;
  }
}

.container {
  width: 1180px;
  margin: rem(50) auto rem(150) auto;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 80px;
    margin-top: 60px;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
    margin-top: 50px;
  }

  button {
    font-family: $sans;
    padding: rem(5);
    border-radius: rem(5);
    border: none;
    background-color: $font-black;
    color: $font-white;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
      @include box-shadow-animation(#777);
    }
  }
}
</style>