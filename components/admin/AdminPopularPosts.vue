<script setup lang=ts>
const store = useAdminStore();
const { fetchTopPosts } = useAdminStore();

await fetchTopPosts();
</script>
<template>
  <div v-show="store.isDashboardShow" class="popular-post">
    <h1>Popular Posts</h1>
    <div class="posts">
      <div v-for="(item, index) in store.postTop" :key="index" class="post">
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