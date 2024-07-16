<script setup lang=ts>
const store = usePostStore();
const post = computed(() => store.postsPage)
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768
});

const mobile = breakpoints.between('mobile', 'tablet');

defineProps({
  isSearchedBy: {
    type: Boolean
  },
  searchParam: {
    type: String,
    default: 'Search...'
  }
})
</script>
<template>
  <div class="container">
    <div v-if="!isSearchedBy" class="container-title">
      <h1>All blog posts</h1>
    </div>
    <div v-else class="container-title-sub">
      <NuxtLink to="/" class="home-btn">
        Home
      </NuxtLink>
      <span> > </span>
      <span>{{ searchParam }}</span>
    </div>
    <div class="post-wrapper">
      <template v-if="post.content.length > 0">
        <div v-for="item in post.content" :key="item.id" class="post">
          <NuxtLink :to="'/post/' + item.id" class="img-wrapper">
            <img v-if="item.thumbnail === 'Default Thumbnail'" src="/assets/img/pineapples.jpg" alt="all-post-img">
            <img v-else :src="item.thumbnail">
          </NuxtLink>
          <div class="content-wrapper">
            <NuxtLink :to="'/post/' + item.id">
              <div class="all-post-title">
                <span class="title">
                  {{ item.title }}
                </span>
                <span class="up-right-btn">
                  <NuxtImg src="/svg/arrow-up-right-svgrepo-com.svg" />
                </span>
              </div>
              <div class="all-post-text" v-html="$sanitizeHTML(item.content)" />
            </NuxtLink>
            <div class="post-bottom-wrapper">
              <div v-show="!mobile" class="all-post-category">
                <NuxtLink :to="`/category/${item.categoryTitle}/0`">
                  {{ item.categoryTitle }}
                </NuxtLink>
              </div>
              <div v-show="mobile" class="all-post-category">
                <NuxtLink :to="`/category/${item.categoryTitle}`">
                  {{ item.categoryTitle }}
                </NuxtLink>
              </div>
              <div class="all-post-day">
                {{ useDateFormat(item.createdDate, 'MMM D, YYYY', { locales: 'en-US' }).value }}
              </div>
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
      border-radius: 7px;
      background-color: transparent !important;
      padding-top: 15px;
    }

    .post-bottom-wrapper {
      .all-post-category {
        @include post-category-darkmode;

        a {
          color: $font-white;
        }

        &::before {
          background-color: $background-color !important;
        }

        &:hover {
          a {
            color: $font-black !important;
          }
        }
      }

      .all-post-day {
        color: $font-white !important;
      }
    }


    .all-post-title {
      .title {
        color: $darkmode-point-color !important;
      }

      .up-right-btn {
        filter: invert(1);
      }
    }

    .all-post-text {
      color: $font-white !important;
    }
  }

  .container-title-sub {
    .home-btn {
      color: $font-white !important;
    }
  }
}

.container {

  width: 1180px;
  margin: rem(25) auto;
  z-index: 0;

  @media (min-width:768px) and (max-width: 1024px) {
    padding: 0 10px;
  }

  .container-title {
    h1 {
      font-weight: 500;
      font-family: $sans, serif;
      font-size: rem(24);
    }

    @media screen and (max-width: 767px) {
      text-align: center;
      margin-top: rem(40);
    }
  }

  .container-title-sub {
    .home-btn {
      cursor: pointer;
      color: $font-black;
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
        align-items: center;
        height: rem(420);
        border-radius: 7px;
        background-color: #fffaf036;
        padding-top: 15px;
        flex-direction: column;
      }

      .img-wrapper {
        width: 100%;
        height: rem(260);
        display: block;
        border: 2px solid $font-black;
        border-radius: rem(10);

        @media screen and (max-width: 767px) {
          height: rem(200);
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: rem(10);
          object-fit: cover;
          overflow: hidden;
        }
      }

      .content-wrapper {
        margin-top: rem(20);

        @media screen and (max-width: 767px) {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-top: rem(20);
          padding: rem(5) rem(7);
        }

        .post-bottom-wrapper {
          @include post-bottom;

          .all-post-category {

            @include post-category;

          }

          .all-post-day {
            @include post-day;
          }
        }

        .all-post-title {
          display: flex;
          align-items: center;

          .title {
            @include sub-post-title
          }

          .up-right-btn {
            margin-left: auto;

            img {
              width: rem(20);
              height: rem(20);
            }
          }
        }

        .all-post-text {
          @include post-text(4);
          height: rem(80);

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
      }
    }
  }
}
</style>