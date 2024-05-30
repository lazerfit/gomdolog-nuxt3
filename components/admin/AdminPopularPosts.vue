<script setup lang=ts>
import type { AdminPopularPosts } from '~/types';

const token = sessionStorage.getItem('_token');
const store = useAdminStore();

const data = await useFetch<AdminPopularPosts[]>('/api/post/popular/top5', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const popularPosts = computed(() => data.data.value ?? []);
</script>
<template>
  <div class="popular-post" v-show="store.isDashboardShow">
    <h1>Popular Posts</h1>
    <div class="posts">
      <div class="post" v-for="(item, index) in popularPosts" :key="index">
        <div class="post-title">
          {{ item.title }}
        </div>
        <div class="views">
          {{ item.views }}views
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .posts {
    box-shadow: 1px 1px 5px $dim-black !important;
  }
}

.popular-post {
  margin: rem(20);
  width: 100%;

  @media (max-width: 767px) {
    width: 100%;
  }

  .posts {
    border-radius: rem(10);
    box-shadow: 3px 3px 10px $light-black;
    margin-top: rem(15);
    padding: rem(10);

    .post {
      display: flex;
      margin: rem(15);

      .post-title {
        width: rem(600);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        @media (max-width: 767px) {
          width: 220px;
        }
      }

      .views {
        margin-left: auto;
      }
    }
  }
}
</style>