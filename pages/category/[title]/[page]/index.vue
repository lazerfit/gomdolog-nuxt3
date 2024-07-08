<script setup lang=ts>
import type { PostPageResponseWithoutTags } from '~/types';
const param = useRoute().params;
const store = usePostStore()


const { data } = await useFetch<PostPageResponseWithoutTags>(`/api/category`, {
  params: {
    title: param.title,
    page: param.page,
    size: 9
  }
});

if (data.value?.numberOfElements === 0) {
  showError({ statusCode: 404, statusMessage: 'page not found', message: 'page not found' })
}

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

useHead({
  title: param.title,
})
</script>
<template>
  <div>
    <TheBanner />
    <PostAll :is-searched-by="true" :search-param="param.title" />
    <PaginationForSearch :nuxt-link-base="`/category`" />
  </div>
</template>

<style lang='scss' scoped></style>