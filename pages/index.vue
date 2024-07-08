<script setup lang=ts>
import type { PostPageResponseWithoutTags } from '~/types';
const store = usePostStore();

const isExpired = () => {
  if (localStorage.getItem('visitedPostCreatedAt')) {
    const storedCreatedAt = parseInt(localStorage.getItem('visitedPostCreatedAt') || '0');
    return Date.now() - storedCreatedAt >= 24 * 60 * 60 * 1000
  }
}

const { data } = await useFetch<PostPageResponseWithoutTags>('/api/post/all', {
  params: {
    page: 0,
    size: store.pageSize
  }
});

const post = computed(() => data.value ?? {
  content: [],
  numberOfElements: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  first: false,
  last: false,
  number: 0,
})

store.postsPage = post.value;

onBeforeMount(() => {
  if (!localStorage.getItem('visitedPost')) {
    localStorage.setItem('visitedPost', JSON.stringify([]))
    localStorage.setItem('visitedPostCreatedAt', Date.now().toString())
  }

  if (isExpired()) {
    localStorage.removeItem('visitedPost')
    localStorage.setItem('visitedPostCreatedAt', Date.now().toString())
  }
})
</script>
<template>
  <div>
    <LazyTheBanner />
    <PostPopular />
    <PostAll :is-searched-by="false" />
    <ThePagination :is-index="true" />
    <LazyPaginationForMobile />
  </div>
</template>

<style lang='scss' scoped></style>