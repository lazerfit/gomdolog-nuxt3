<script setup lang=ts>
import type { PostPageResponseWithoutTags } from '~/types';

const postStore = usePostStore();
const config = useRuntimeConfig();
const param = useRoute().params;
const limit = 5;

defineProps({
  isIndex: {
    type: Boolean,
    default: false
  },
  nuxtLinkBase: {
    type: String,
    default: ''
  }
});

const currentPage = computed(() => postStore.postsPage.number + 1)
const pages = computed(() => {
  const startPage = Math.max(currentPage.value - Math.floor(limit / 2), 1);
  const endPage = Math.min(startPage + limit - 1, postStore.postsPage.totalPages);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const changePage = async (pageNum: number): Promise<void> => {
  const data = await $fetch<PostPageResponseWithoutTags>(
    `${config.public.apiBase}/post/all`,
    {
      params: {
        page: pageNum,
        size: postStore.pageSize
      },
    }
  );

  postStore.postsPage = data;
}
</script>
<template>
  <div class="wrapper">
    <div class="btn-first">
      <button :disabled="postStore.postsPage.first" @click="changePage(0)">
        처음 페이지
      </button>
    </div>
    <div class="previous">
      <button :disabled="postStore.postsPage.first" @click="changePage(currentPage - 2)"><i
          class="fa-solid fa-chevron-left" /></button>
    </div>
    <ul v-if="isIndex" class="pagination">
      <li v-if="currentPage > 3" @click="changePage(0)">1</li>
      <li v-if="currentPage > 4" @click="changePage(currentPage - 3)"> ...</li>
      <li v-for="n in pages" :key="n" :class="{ active: n === currentPage }" @click="changePage(n - 1)">
        {{ n }}
      </li>
    </ul>
    <ul v-else class="pagination">
      <li v-if="currentPage > 3" @click="changePage(0)">1</li>
      <li v-if="currentPage > 4" @click="changePage(currentPage - 3)"> ...</li>
      <li v-for="n in pages" :key="n" :class="{ active: n === currentPage }">
        <NuxtLink :to="`${nuxtLinkBase}/${param.title}/${n - 1}`">
          {{ n }}
        </NuxtLink>
      </li>
    </ul>
    <div class="next">
      <button :disabled="postStore.postsPage.last" @click="changePage(currentPage)"><i
          class="fa-solid fa-chevron-right" /></button>
    </div>
    <div class="btn-last">
      <button :disabled="postStore.postsPage.last" @click="changePage(postStore.postsPage.totalPages - 1)">마지막
        페이지</button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {

  button {
    color: $font-white !important;

    &:disabled {
      color: $gray-7 !important;
    }
  }

  .pagination {

    li {
      color: $font-white;

      a {
        color: $font-white;
      }
    }

    .active {
      color: $font-black;

      a {
        color: $font-black !important;
      }
    }
  }
}

.wrapper {
  width: 1180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: rem(70) auto rem(30) auto;

  @media screen and (max-width: 767px) {
    display: none;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  .btn-first {
    margin-right: rem(10);
  }

  .btn-last {
    margin-left: rem(10);
  }

  button {
    cursor: pointer;
    background-color: transparent;
    font-family: $pretendard;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  .pagination {


    li {
      display: inline;
      cursor: pointer;
      margin: 0 rem(10);
      padding: rem(3) rem(10);

      &:hover:not(.active) {
        text-decoration: underline;
      }
    }

    .active {
      background-color: $gray-2;
      border-radius: 5px;
    }
  }
}
</style>