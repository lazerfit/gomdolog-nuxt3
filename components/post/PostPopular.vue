<script setup lang=ts>
const { fetchAllTop } = usePostStore();
const post = await fetchAllTop();
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
          <NuxtLink :to="'/post/' + post[0].id">
            <div class="main-post-title">
              <span class="title">
                {{ post[0].title }}
              </span>
              <span class="up-right-btn">
                <NuxtImg src="/svg/arrow-up-right-svgrepo-com.svg" />
              </span>
            </div>
            <div class="main-post-text" v-html="$sanitizeHTML(post[0].content)" />
          </NuxtLink>
          <div class="main-post-bottom">
            <div class="main-post-category">
              <NuxtLink :to="`/category/${post[0].categoryTitle}/0`">
                {{ post[0].categoryTitle }}
              </NuxtLink>
            </div>
            <div class="main-post-day">
              {{ useDateFormat(post[0].createdDate, 'MMM D, YYYY', { locales: 'en-US' }).value }}
            </div>
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
            <NuxtLink :to="'/post/' + item.id">
              <div class="sub-post-title">
                <span class="title">
                  {{ item.title }}
                </span>
                <span class="up-right-btn">
                  <NuxtImg src="/svg/arrow-up-right-svgrepo-com.svg" />
                </span>
              </div>
              <div class="sub-post-text" v-html="$sanitizeHTML(item.content)" />
            </NuxtLink>
            <div class="sub-post-bottom">
              <div class="sub-post-category">
                <NuxtLink :to="`/category/${item.categoryTitle}/0`">
                  {{ item.categoryTitle }}
                </NuxtLink>
              </div>
              <div class="sub-post-day">
                {{ useDateFormat(item.createdDate, 'MMM D, YYYY', { locales: 'en-US' }).value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {

  .main-post-category,
  .sub-post-category {
    @include post-category-darkmode;

    a {
      color: $font-white !important;
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

  .container {
    border-bottom: 1px solid #555 !important;
  }

  h1 {
    color: $font-white !important;
  }

  .main-post-title,
  .sub-post-title {
    .title {
      color: $darkmode-point-color !important;
    }

    .up-right-btn {
      filter: invert(1);
    }
  }

  .main-post-text {
    color: $font-white !important;
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
    font-family: $sans, serif;
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
        border: 2px solid $font-black;
        border-radius: rem(10);


        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          overflow: hidden;
          border-radius: rem(10);
          cursor: pointer;
        }
      }

      .content-wrapper {
        margin: rem(20) rem(10);

        .main-post-title {
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

        .main-post-text {
          @include post-text(9);
          height: rem(180);
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

        .main-post-bottom {
          @include post-bottom;
          margin-top: rem(60);

          .main-post-category {
            @include post-category;
          }

          .main-post-day {
            @include post-day;
          }
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
          border: 2px solid $font-black;
          border-radius: rem(10);

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

          .sub-post-title {
            display: flex;
            align-items: center;

            .title {
              @include sub-post-title;
              display: block;
            }

            .up-right-btn {
              margin-left: auto;

              img {
                width: rem(20);
                height: rem(20);
              }
            }
          }

          .sub-post-text {
            @include post-text(8);
            height: rem(160);
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

          .sub-post-bottom {
            @include post-bottom;
            margin-top: rem(40);

            .sub-post-category {
              @include post-category;
            }

            .sub-post-day {
              @include post-day;
            }
          }
        }
      }
    }
  }
}
</style>