<script setup lang=ts>
const store = usePostStore();

const post = computed(() => store.postsPage ?? {
  content: [],
  numberOfElements: 0,
  size: 0
})
</script>
<template>
  <div class="container">
    <div class="container-title">
      <h1>All blog posts</h1>
    </div>
    <div class="post-wrapper">
      <template v-if="post.content.length > 0">
        <div class="post" v-for="item in post.content" :key="item.id">
          <NuxtLink :to="'/post/' + item.id">
            <img src="/assets/img/pineapples.jpg" alt="all-post-img" v-if="item.thumbnail === 'Default Thumbnail'">
            <img :src="item.thumbnail" v-else>
          </NuxtLink>
          <div class="content-wrapper">
            <div class="all-post-category">
              {{ item.categoryTitle }}
            </div>
            <NuxtLink :to="'/post/' + item.id">
              <div class="all-post-title">
                {{ item.title }}
              </div>
              <div class="all-post-text" v-html="item.content">
              </div>
            </NuxtLink>
            <div class="all-post-day">
              {{ store.formatDate(item.createdDate) }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty-img-container">
          <img src="/assets/img/box.png" alt="empty-post-img">
          <p>
            Looks like there's nothing here.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.darkMode {
  .post {

    @media screen and (max-width: 767px) {
      width: 100%;
      display: flex;
      height: 220px;
      box-shadow: rgba(0, 0, 0, 0.493) 0px 60px 40px -7px !important;
      border-radius: 7px;
      background-color: #0d182150 !important;
      padding-top: 15px;
    }

    .all-post-category {
      color: $font-black !important;
    }

    .all-post-title {
      color: #E9FF92 !important;
    }

    .all-post-text {
      color: $font-white !important;
    }
  }
}

.container {

  width: 1180px;
  margin: rem(25) auto;

  @media (min-width:768px) and (max-width: 1024px) {
    padding: 0 10px;
  }

  .container-title {
    h1 {
      font-weight: 500;
      font-family: "Playfair Display", serif;
      font-size: rem(24);
    }

    @media screen and (max-width: 767px) {
      text-align: center;
    }

  }

  .all-post-title {
    h1 {
      font-weight: 500;
      font-family: "Playfair Display", serif;
      font-size: rem(24);
    }
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
      font-family: "Rancho";
      margin-top: 20px;
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 20px;
    padding: 0 7px;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
    margin-top: 0;
  }

  .post-wrapper {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin-top: rem(10);

    @media screen and (max-width: 767px) {
      margin-top: 0;
      justify-content: space-between;
      gap: 5px;
    }

    @media (min-width:768px) and (max-width: 1024px) {
      justify-content: space-around;
    }

    .post {
      width: rem(380);
      height: rem(460);
      margin-top: rem(25);

      @media screen and (max-width: 767px) {
        width: 100%;
        display: flex;
        height: 220px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
        border-radius: 7px;
        background-color: #fffaf036;
        padding-top: 15px;
      }

      img {
        width: 100%;
        height: rem(260);
        border-radius: rem(10);
        object-fit: cover;

        @media screen and (max-width: 767px) {
          height: 190px;
        }
      }

      .content-wrapper {
        margin: 0 rem(10);

        @media screen and (max-width: 767px) {
          min-width: 60%;
          max-width: 60%;
        }

        .all-post-category {
          font-family: $sans;
          margin: rem(5) 0;
          font-size: rem(14);
          background-color: #f5f5f5;
          width: rem(50);
          text-align: center;
          padding: rem(3);
          border-radius: rem(5);
          margin-bottom: rem(7);
          cursor: pointer;
        }

        .all-post-title {
          @include sub-post-title
        }

        .all-post-text {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          line-height: rem(20);
          height: rem(80);
          margin-top: rem(14);
          color: #555;
          cursor: pointer;

          @media screen and (max-width: 767px) {
            font-size: rem(24);
          }
        }

        .all-post-text:deep(img) {
          display: none;
        }

        .all-post-text:deep(a) {
          text-decoration: none;
          pointer-events: none;
          cursor: default;
          color: $font-black;
        }


        .all-post-day {
          margin-top: rem(15);
          font-size: rem(13);
          color: #999;
        }
      }
    }
  }
}
</style>