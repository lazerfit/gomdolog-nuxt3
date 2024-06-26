<script setup lang=ts>
import type { PostResopnseWithoutTags } from '~/types';
const store = usePostStore();
const data = await useFetch<PostResopnseWithoutTags[]>('/api/post/popular', {
  params: { limit: 3 }
});
const post = computed(() => data.data.value ?? [])
</script>
<template>
  <div class="container">
    <div>
      <h1>
        Popular blog posts
      </h1>
    </div>
    <div class="post-wrapper">
      <div class="main-post">
        <NuxtLink class="main-post-img" :to="'/post/' + post[0].id">
          <img v-if="post[0].thumbnail === 'Default Thumbnail'" src=/assets/img/pineapples.jpg alt="mockup">
          <img v-else :src=post[0].thumbnail>
        </NuxtLink>
        <div class="content-wrapper">
          <div class="main-post-category">
            {{ post[0].categoryTitle }}
          </div>
          <NuxtLink :to="'/post/' + post[0].id">
            <div class="main-post-title">
              {{ post[0].title }}
            </div>
            <div class="main-post-text" v-html="$sanitizeHTML(post[0].content)" />
          </NuxtLink>
          <div class="main-post-day">
            {{ store.formatDate(post[0].createdDate) }}
          </div>
        </div>
      </div>
      <div class="sub-post-wrapper">
        <div v-for="item in (post.slice(1, 3))" :key="item.id" class="sub-post">
          <NuxtLink class="sub-post-img" :to="'/post/' + item.id">
            <img v-if="item.thumbnail === 'Default Thumbnail'" src=/assets/img/pineapples.jpg alt="mockup">
            <img v-else :src=item.thumbnail>
          </NuxtLink>
          <div class="content-wrapper">
            <div class="sub-post-category">
              {{ item.categoryTitle }}
            </div>
            <NuxtLink :to="'/post/' + item.id">
              <div class="sub-post-title">
                {{ item.title }}
              </div>
              <div class="sub-post-text" v-html="$sanitizeHTML(item.content)" />
            </NuxtLink>
            <div class="sub-post-day">
              {{ store.formatDate(item.createdDate) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {

  .container {
    border-bottom: 1px solid #555 !important;
  }

  h1 {
    color: $font-white !important;
  }

  .main-post-title {
    color: #E9FF92 !important;
  }

  .main-post-text {
    color: $font-white !important;
  }

  .sub-post-title {
    color: #E9FF92 !important;
  }

  .sub-post-text {
    color: $font-white !important;
  }
}


.container {
  color: $font-black;
  width: 1180px;
  margin: rem(30) auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  padding-bottom: 50px;

  @media screen and (max-width: 767px) {
    display: none;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
    margin-top: 60px;
    height: 700px;
    padding: 0 10px;
  }

  h1 {
    font-weight: 500;
    font-family: "Playfair Display", serif;
    font-size: rem(24);
  }

  .post-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    height: rem(600);
    margin-top: rem(30);
    justify-content: space-between;

    .main-post {
      width: rem(570);

      @media (min-width:768px) and (max-width: 1024px) {
        display: none;
      }

      .main-post-img {
        width: 100%;
        height: rem(265);
        display: block;

        img {
          width: inherit;
          height: inherit;
          object-fit: cover;
          border-radius: rem(15);
          cursor: pointer;
        }
      }

      .content-wrapper {
        margin: rem(20) rem(10);


        .main-post-category {
          @include post-category;
        }

        .main-post-title {
          font-weight: 600;
          font-size: rem(30);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: rem(5);
          cursor: pointer;
          color: $font-black;
          font-family: $font-third;

          &:hover {
            text-shadow: 1.5px 1.5px #999;
          }
        }

        .main-post-text {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 9;
          -webkit-box-orient: vertical;
          line-height: rem(20);
          height: rem(180);
          margin-top: rem(14);
          color: #555;
          cursor: pointer;
        }

        .main-post-text:deep(img) {
          display: none;
        }

        .main-post-text:deep(a) {
          text-decoration: none;
          pointer-events: none;
          cursor: default;
          color: $font-black;
        }

        .main-post-day {
          margin-top: rem(30);
          font-size: rem(13);
          color: #999;
        }
      }
    }

    .sub-post-wrapper {
      width: rem(570);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media (min-width:768px) and (max-width: 1024px) {
        width: 100%;
        height: 580px;
      }

      .sub-post {
        width: 100%;
        height: rem(270);
        display: flex;

        .sub-post-img {
          img {
            width: rem(260);
            height: 100%;
            object-fit: cover;
            border-radius: rem(10);
            cursor: pointer;
          }
        }

        .content-wrapper {
          margin-left: rem(10);
          width: rem(295);

          @media (min-width:768px) and (max-width: 1024px) {
            width: 100%;
          }

          .sub-post-category {
            @include post-category
          }

          .sub-post-title {
            @include sub-post-title;
            display: block;
          }

          .sub-post-text {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 8;
            -webkit-box-orient: vertical;
            line-height: rem(20);
            height: rem(160);
            margin-top: rem(14);
            color: #555;
            cursor: pointer;
          }

          .sub-post-text:deep(img) {
            display: none;
          }

          .sub-post-text:deep(a) {
            text-decoration: none;
            pointer-events: none;
            cursor: default;
            color: $font-black;
          }

          .sub-post-day {
            margin-top: rem(15);
            font-size: rem(13);
            color: #999;
          }
        }
      }
    }
  }
}
</style>