<script setup lang=ts>
import type { PostDeleted } from '~/types';

const adminStore = useAdminStore();
const postStore = usePostStore();
const token = sessionStorage.getItem('_token');
const config = useRuntimeConfig();
const toastStore = useCommonStore();

const revertDelete = async (id: number) => {
  await $fetch(`${config.public.apiBase}/post/revertDelete/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(() => {
    fetchAll();
    toastStore.setToast('성공적으로 삭제하였습니다.', 'check');
  }).catch((error) => {
    toastStore.setToast('오류가 발생하였습니다.\n다시 시도해주세요.', 'error');
    console.log(error);
  })
}

const deletePermanent = async (id: number) => {
  const confirmed = window.confirm('삭제하시면 복구하실 수 없습니다.\n정말 삭제하시겠습니까?')
  try {
    if (confirmed) {
      await $fetch(`${config.public.apiBase}/post/deletePermanent/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(() => {
        fetchAll();
        toastStore.setToast('성공적으로 삭제하였습니다.', 'check');
      }
      )
    }
  } catch (error) {
    console.log(error);
    toastStore.setToast('삭제에 실패하였습니다.\n다시 시도해주세요.', 'error');
  }
}

const fetchAll = async () => {
  await $fetch<PostDeleted[]>(`${config.public.apiBase}/post/recycling`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    postStore.postsDeleted = response
  });
}

fetchAll();

</script>
<template>
  <div v-if="adminStore.isRecycleBinShow" class="recyclebin-container">
    <h1>Recycle Bin</h1>
    <div v-if="postStore.postsDeleted.length > 0" class="posts">
      <div v-for="item in postStore.postsDeleted" :key="item.id" class="post">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="date">
          {{ postStore.formatDate(item.deletedDate) }}
        </div>
        <div class="btns">
          <i class="fa-solid fa-rotate" @click="revertDelete(item.id)" />
          <i class="fa-solid fa-trash" @click="deletePermanent(item.id)" />
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