<script setup lang=ts>
import { ref, onBeforeMount, onMounted } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

const utterancesContainer: Ref<HTMLDivElement | null> = ref(null);
const router = useRouter();
const route = useRoute();
const toastStore = useCommonStore();
const headerStore = useHeaderStore();
const postStore = usePostStore();

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

const goBack = () => {
  router.go(-1);
};

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
};

const linkCopy = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => {
      toastStore.setToast("복사가 완료되었습니다.", 'check');
    }).catch((error: string) => {
      console.log('링크 복사 중 오류 발생: ', error);
    })
}

const isVisitedPost = () => {
  const visitedPost = localStorage.getItem('visitedPost');
  return visitedPost ? visitedPost.includes(route.params.id as string) : false;
}

const shareTwitter = () => {
  window.open('https://twitter.com/intent/tweet?url=' + document.URL + '&text=' + postStore.post.title, "_blank", "width=450,height=500")
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
        <div class="date-admin-wrapper">
          <div class="created-date">
            {{ postStore.formatDate(postStore.post.createdDate) }}
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
        </div>
      </div>
      <div class="post-text" v-html="$sanitizeHTML(postStore.post.content)" />
      <div class="sns">
        <div class="back-btn">
          <i class="fa-solid fa-chevron-left" @click="goBack" />
        </div>
        <div class="wrapper">
          <span>
            <i class="fa-brands fa-x-twitter" @click="shareTwitter" />
          </span>
          <span>
            <LazyTheToast />
            <i class="fa-solid fa-paperclip" @click="linkCopy" />
          </span>
        </div>
        <div class="up-btn">
          <i class="fa-solid fa-chevron-up" @click="scrollToTop" />
        </div>
      </div>
    </div>
    <div class="comment">
      <div ref="utterancesContainer" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
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
      color: #ffda79 !important;
    }
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
    width: 100%;
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
    width: rem(900);

    @media (max-width: 767px) {
      width: 100%;
    }

    @media (min-width:768px) and (max-width: 1024px) {
      width: 100%;
    }

    .post-title {
      text-align: center;
      font-weight: 500;
      font-family: $font-third;

      .title {
        font-size: rem(35);

        @media (max-width: 767px) {
          font-size: rem(44);
        }
      }

      .post-title-tags {
        margin-bottom: rem(5);

        span {
          font-size: 0.9rem;
          font-family: $font-third;
          color: #519872a8;
          margin-right: rem(7);

          @media (max-width: 767px) {
            font-size: 1.2rem;
          }
        }
      }

      .date-admin-wrapper {
        font-size: 0.8rem;
        margin-top: rem(10);
        color: #999;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .created-date {
          font-size: 0.9rem;
        }

        .admin-wrapper {
          margin-top: rem(7);

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
    }

    .post-text {
      margin: rem(30) auto;
      font-size: rem(18);
      line-height: rem(31);
      white-space: pre-wrap;
      word-wrap: break-word;

      @media (max-width: 767px) {
        margin: 30px 10px;
        font-size: rem(28);
      }

      @media (min-width:768px) and (max-width: 1024px) {
        margin: 30px 20px;
      }
    }

    .post-text:deep(p) {
      margin-bottom: 0;
      line-height: 2.1rem;
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

    .sns {
      display: flex;
      justify-content: space-between;

      .wrapper {
        transition: all .3s ease;

        &:hover span i {
          opacity: .5;
        }

        span {
          i {
            transition: all .3s ease;
            font-size: 1.25rem;

            &:hover {
              transform: translateY(-5px) scale(1.1);
              opacity: 1;
            }
          }
        }
      }

      .back-btn {
        cursor: pointer;
        color: #999;
        padding: 10px 15px;

        .fa-chevron-left {
          font-size: rem(17);

          &:hover {
            animation: back-btn 1.1s linear infinite;
          }
        }
      }

      .up-btn {
        cursor: pointer;
        color: #999;
        padding: 10px 15px;

        .fa-chevron-up {
          font-size: rem(17);

          &:hover {
            animation: up-btn 1.1s linear infinite;
          }
        }
      }

      span {
        font-size: rem(22);
        margin-right: rem(7);
        cursor: pointer;
      }
    }
  }
}
</style>