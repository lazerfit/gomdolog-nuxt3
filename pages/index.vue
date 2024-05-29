<script setup lang=ts>
import type { PostPageResponseWithoutTags } from '~/types';
const store = usePostStore();

const { data } = await useFetch<PostPageResponseWithoutTags>('/api/post/all', {
  params: {
    size: store.pageSize
  }
});
store.postsPage = data.value;
</script>
<template>
  <div>
    <TheBanner />
    <PostAll />
    <MoreButton />
  </div>
</template>

<style lang='scss' scoped></style>