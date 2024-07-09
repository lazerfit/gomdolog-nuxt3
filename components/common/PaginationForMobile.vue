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
    <div class="btn-first">
      <button>
        처음 페이지
      </button>
    </div>
    <div class="previous">
      <button><i class="fa-solid fa-chevron-left" /></button>
    </div>
    <ul class="pagination">
      <li>1</li>
      <li> ...</li>
      <li>
        n
      </li>
    </ul>
    <div class="next">
      <button><i class="fa-solid fa-chevron-right" /></button>
    </div>
    <div class="btn-last">
      <button>마지막
        페이지</button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.wrapper {
  width: 100%;
  display: none;
}
</style>