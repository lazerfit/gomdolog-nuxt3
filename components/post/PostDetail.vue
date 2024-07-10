<script setup lang=ts>
import { ref, onBeforeMount, onMounted } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'
import { isClient } from '@vueuse/shared';

const utterancesContainer: Ref<HTMLDivElement | null> = ref(null);
const route = useRoute();
const toastStore = useCommonStore();
const headerStore = useHeaderStore();
const postStore = usePostStore();

const formattedDate = useDateFormat(postStore.post.createdDate, 'MMM D, YYYY', { locales: 'en-US' });

const addUtterancesScript = () => {
  if (utterancesContainer.value !== null) {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "lazerfit/gomdolog-front");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-light");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    utterancesContainer.value.appendChild(script);
  } else {
    console.error("utterancesContainer is null.");
  }
}

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
};

const isVisitedPost = () => {
  const visitedPost = localStorage.getItem('visitedPost');
  return visitedPost ? visitedPost.includes(route.params.id as string) : false;
}

const postId = route.params.id;

if (postStore.post.title === '') {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const deletePost = async () => {
  const token = sessionStorage.getItem('_token');
  try {
    const confirmed = window.confirm('정말 삭제하시겠습니까?')
    if (confirmed) {
      await useFetch(`/api/post/delete/${postId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    } else {
      return
    }
  } catch {
    toastStore.setToast('삭제에 실패하였습니다.', 'error');
  }
}

onBeforeMount(async () => {
  if (!isVisitedPost() && !headerStore.isAdmin) {
    await useFetch(`/api/post/${postId}/views`, { method: 'POST' })
    const visitedPostString = localStorage.getItem('visitedPost') || '[]';
    const visitedPost = JSON.parse(visitedPostString);
    visitedPost.push(route.params.id);
    localStorage.setItem('visitedPost', JSON.stringify(visitedPost));
  }
});

onMounted(() => {
  addUtterancesScript();
  hljs.highlightAll();
});

const shareOptions = ref({
  title: postStore.post.title,
  text: 'share test',
  url: isClient ? location.href : ''
})

const { share, isSupported } = useShare(shareOptions);

const startShare = async () => {
  return share().catch(err => console.log('postShare error : {}', err))
}

</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="post-title">
        <div class="post-title-tags">
          <span v-for="(tag, index) in (postStore.post.tags)" :key="index">#{{ tag
            }}</span>
        </div>
        <div class="title">
          {{ postStore.post.title }}
        </div>
      </div>
      <div class="summary-wrapper">
        <div v-if="postStore.post.summary != 'no summary'" class="summary">
          <i class="fa-solid fa-quote-left" />
          <div>
            {{ postStore.post.summary }}
          </div>
          <i class="fa-solid fa-quote-right" />
        </div>
      </div>
      <div class="date-admin">
        <div class="created-date">
          {{ formattedDate }}
        </div>
        <div v-if="headerStore.isAdmin" class="admin-wrapper">
          <NuxtLink :to="`/post/update/${postId}`">
            <span>
              <i class="fa-solid fa-pen" />
            </span>
          </NuxtLink>
          <span>
            <i class="fa-solid fa-trash" @click="deletePost" />
          </span>
        </div>
        <div class="btn-share">
          <button :disabled="!isSupported" @click="startShare">
            <i class="fa-solid fa-share" />
          </button>
        </div>
      </div>
      <div class="divider" />
      <div class="post-text" v-html="$sanitizeHTML(postStore.post.content)" />
    </div>
    <div class="comment">
      <div ref="utterancesContainer" />
    </div>
  </div>
  <div class="float-btn" @click="scrollToTop">
    <i class="fa-solid fa-chevron-up" />
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .date-admin {
    color: $gray-2 !important;
  }

  .post-text {
    color: $font-white !important;
  }

  .summary {
    i {
      color: $gray-4 !important;
    }

    div {
      color: $font-white !important;
    }

    .fa-solid {
      color: $font-white;
    }
  }

  .divider {
    background-color: #ffffff2f !important;
  }

  .admin-wrapper {

    span {

      i {

        &:hover {
          color: $font-white !important;
        }
      }
    }
  }

  .post-title-tags {

    span {
      color: $gray-7 !important;
    }
  }
}

.float-btn {
  position: fixed;
  right: 10px;
  bottom: 10px;
  padding: rem(15);
  border-radius: 50%;
  box-shadow: rgba(63, 71, 77, 0.25) 0px 2px 10px 0px;
  cursor: pointer;
  transition: all .1s;
  background-color: #f9f9f9;

  &:hover {
    background-color: $gray-1;
  }
}

.container {
  width: 1180px;
  margin: rem(40) auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 1rem;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  .comment {
    margin-top: rem(40);
    width: rem(900);

    @media (max-width: 767px) {
      width: 100%;
    }

    @media (min-width:768px) and (max-width: 1024px) {
      width: 100%;
    }
  }

  .content-wrapper {
    width: rem(720);

    @media (max-width: 767px) {
      max-width: 100%;
    }

    @media (min-width:768px) and (max-width: 1024px) {
      max-width: rem(773);
    }

    .post-title {
      text-align: center;
      font-weight: 700;
      font-family: $pretendard;
      width: rem(720);
      justify-content: center;
      align-items: center;
      display: block;
      margin: 0 auto;

      @media (max-width: 767px) {
        width: 100%;
      }

      .title {
        font-size: 2.5rem;
        line-height: 1.2;
        text-align: left;
        font-family: $pretendard;

        @media (max-width: 767px) {
          font-size: rem(30);
          line-height: rem(39);
          letter-spacing: rem(-0.75);
        }
      }

      .post-title-tags {
        margin-bottom: rem(5);
        display: flex;

        span {
          font-size: 0.9rem;
          font-family: $pretendard;
          font-weight: 300;
          color: $gray-6;
          margin-right: rem(7);
          display: inline-block;
          background-color: $gray-1;
          border-radius: rem(10);
          padding: rem(5);

          @media (max-width: 767px) {
            font-size: 1rem;
            line-height: rem(24);
          }
        }
      }
    }

    .summary-wrapper {
      font-size: 0.8rem;
      margin-top: rem(10);
      color: #999;
      font-family: $pretendard;
      width: rem(720);


      @media (min-width:768px) and (max-width: 800px) {
        width: rem(730);
        margin: 0 auto;
      }

      @media (max-width: 767px) {
        width: 100%;

      }

      .summary {
        color: $font-black;
        margin: rem(20) auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        div {
          max-width: rem(720);
          font-size: 1.34rem;
          line-height: 1.2;
          text-align: left;
          font-weight: 400;
          color: $gray-7;
          font-family: $pretendard;

          @media (max-width: 767px) {
            font-size: rem(19);
            line-height: rem(27);
          }
        }

        i {
          margin-bottom: auto;
          color: $gray-6;
          font-size: 1.2rem;
        }

        .fa-quote-left {
          margin-right: rem(5);

        }

        .fa-quote-right {
          margin-left: rem(5);
          margin-left: auto;
        }
      }
    }

    .date-admin {
      width: rem(720);
      display: flex;
      align-items: center;
      margin: rem(30) auto 0 auto;
      color: $gray-6;

      .btn-share {
        button {
          padding: rem(3);
          background-color: transparent;

          &:disabled {
            display: none;
          }

          .fa-share {
            color: $gray-6;
            margin-left: rem(10);
            cursor: pointer;
          }
        }
      }

      @media (max-width: 767px) {
        width: 100%;
        font-size: rem(15);
        line-height: rem(22.5);
      }

      .admin-wrapper {
        margin-left: auto;

        span {
          margin-right: rem(10);

          i {
            cursor: pointer;
            color: #999;
            transition: all .3s ease;

            &:hover {
              color: $font-black;
            }
          }
        }
      }
    }

    .divider {
      width: rem(720);
      height: 1px;
      background-color: #5555551a;
      margin-top: rem(30);

      @media (max-width: 767px) {
        width: 100%;
        margin-left: 0;
      }
    }
  }

  .post-text {
    width: rem(720);
    margin: rem(30) auto;
    font-size: rem(18);
    font-weight: 300;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: $gray-9;
    font-family: $pretendard;

    @media (max-width: 767px) {
      margin: 30px auto;
      font-size: rem(18);
      line-height: rem(30);
      width: 100%;
    }

    @media (min-width:768px) and (max-width: 1024px) {
      margin: 30px auto;
    }
  }

  .post-text:deep(p) {
    margin-bottom: 0;
    line-height: 1.6;
    min-height: 30px;
    font-size: rem(19);
  }

  .post-text:deep(h1) {
    font-size: rem(32);
    line-height: rem(38.4);
    margin: 10px 0;
  }

  .post-text:deep(h2) {
    font-size: rem(24);
    line-height: rem(32);
    margin: 20px 0;
  }

  .post-text:deep(h3) {
    font-size: rem(19);
    margin: 20px 0;
  }

  .post-text:deep(img) {
    max-width: 900px;
    border-radius: rem(10);
    margin: rem(30) auto;
    object-fit: cover;
    display: block;
    margin: 20px auto;

    @media (max-width: 767px) {
      max-width: 330px;
    }
  }

  .post-text:deep(pre code) {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .post-text:deep(a) {
    text-decoration: none;
    color: #fff !important;
    white-space: pre-wrap;
    word-wrap: break-word;

    &:link {
      color: #fff !important;
    }

    &:visited {
      color: blueviolet !important;
    }

    &:hover {
      color: #2c974b !important;
    }
  }
}


@keyframes back-btn {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-7px);
  }
}

@keyframes up-btn {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-7px);
  }
}
</style>