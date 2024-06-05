<script setup lang=ts>
import type { PostPageResponseWithoutTags } from '~/types';
const store = usePostStore();

const { data, pending } = await useFetch<PostPageResponseWithoutTags>('/api/post/all', {
  params: {
    size: store.pageSize
  }
});

const isExpired = () => {
  if (localStorage.getItem('visitedPostCreatedAt')) {
    const storedCreatedAt = parseInt(localStorage.getItem('visitedPostCreatedAt') || '0');
    return Date.now() - storedCreatedAt >= 24 * 60 * 60 * 1000
  }
}

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

store.postsPage = data.value;
</script>
<template>
  <div>
    <TheBanner />
    <TheLoader :isPending="pending" />
    <PostPopular />
    <PostAll />
    <LazyMoreButton />
  </div>
</template>

<style lang='scss' scoped></style>