<script setup lang=ts>
const adminStore = useAdminStore();
const { fetchAllDeletedPosts, revertPost, deletePostPermanent } = useAdminStore();

onBeforeMount(() => {
  fetchAllDeletedPosts();
})

</script>
<template>
  <div v-if="adminStore.isRecycleBinShow" class="recyclebin-container">
    <h1>Recycle Bin</h1>
    <div v-if="adminStore.postsDeleted.length > 0" class="posts">
      <div v-for="item in adminStore.postsDeleted" :key="item.id" class="post">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="date">
          {{ useDateFormat(item.deletedDate, 'MMM D, YYYY', { locales: 'en-US' }).value }}
        </div>
        <div class="btns">
          <i class="fa-solid fa-rotate" @click="revertPost(item.id)" />
          <i class="fa-solid fa-trash" @click="deletePostPermanent(item.id)" />
        </div>
      </div>
    </div>
    <div v-else class="posts">
      <div class="empty-img-container">
        <img src="/assets/img/box.png" alt="empty-post-img">
        <p>
          Looks like there's nothing here.
        </p>
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

.recyclebin-container {
  margin: 0 rem(20);
  width: 100%;

  @media (max-width: 767px) {
    width: 100%;
  }

  .posts {
    border-radius: rem(10);
    box-shadow: 3px 3px 10px $light-black;
    margin-top: rem(15);
    padding: rem(10);

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 30px;
    }

    .empty-img-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;

      img {
        width: 300px;
        border-radius: 30%;
      }

      p {
        font-family: $pretendard;
        margin-top: 20px;
        font-size: 1.5rem;
      }
    }

    .post {
      display: flex;
      gap: rem(10);
      align-items: center;
      margin: rem(15);



      .date {
        font-size: 0.8rem;
        color: $light-black;
      }

      .btns {
        margin-left: auto;

        i {
          margin-right: rem(5);
          cursor: pointer;
          color: $light-black;
          transition: all .3s ease;

          &:hover {
            color: $font-black;
          }
        }
      }
    }
  }
}
</style>