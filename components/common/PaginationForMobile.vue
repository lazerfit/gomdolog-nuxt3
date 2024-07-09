<script setup lang=ts>
import type { PostSliceResponseWithoutTags } from '~/types';

const store = usePostStore();
const config = useRuntimeConfig();
const pageNum = ref(1);
const isLast = ref(false);

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  apiBase: {
    type: String,
    default: '/post/all'
  },
  title: {
    type: String,
    default: ''
  }
})

const onLoadMore = async () => {
  if (!isLast.value && props.isMobile) {
    const data = await $fetch<PostSliceResponseWithoutTags>(`${config.public.apiBase}${props.apiBase}/slice`, {
      params: {
        page: pageNum.value,
        size: 9,
        title: props.title
      }
    });

    if (data.last) {
      isLast.value = true;
    };

    store.postsPage.content.push(...data.content);
    pageNum.value += 1;
  }
}

const { arrivedState } = useScroll(window, {
  offset: { bottom: 200 }
});

watchThrottled(
  () => arrivedState.bottom,
  () => {
    if (arrivedState.bottom) {
      onLoadMore()
    }
  },
  { throttle: 500 }
)
</script>
<template>
  <div class="wrapper">
    <div class="mobile-pagination" />
  </div>
</template>

<style lang='scss' scoped>
.wrapper {
  width: 100%;

}
</style>