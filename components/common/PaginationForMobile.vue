<script setup lang=ts>
import type { IPostPage } from '~/types/model/post';
const store = usePostStore();
const { $api } = useNuxtApp();
const isLast = computed(() => store.postsPage.last);
const pageNum = ref(1);

const props = defineProps({
  apiBase: {
    type: String,
    default: 'all'
  },
  title: {
    type: String,
    default: ''
  }
})

const onLoadMore = async () => {
  if (!isLast.value) {

    if (props.apiBase === 'all') {
      const data = await $api.post.fetchAllSlice(pageNum.value);
      pushDataToStore(data);
    }

    else if (props.apiBase === 'category') {
      const data = await $api.post.fetchAllByCategorySlice(props.title, pageNum.value);
      pushDataToStore(data);
    }

    else {
      const data = await $api.post.fetchAllByTitleSlice(props.title, pageNum.value);
      pushDataToStore(data);
    }

    pageNum.value += 1;
  } else {
    return
  }
}

const pushDataToStore = (data: IPostPage) => {
  store.postsPage.content.push(...data.content);
  store.postsPage.last = data.last;
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