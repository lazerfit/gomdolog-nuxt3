<script setup lang=ts>
const searchQuery = ref('');
const searchPost = async () => {
  useRouter().push(`/post/search/${searchQuery.value}/0`)
}
const searchPostForMobile = async () => {
  useRouter().push(`/post/search/${searchQuery.value}`)
}

defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

</script>
<template>
  <div class="container">
    <div class="title">
      <p>Unlocking the Future with Technology</p>
      <p>Innovate, Integrate, Inspire</p>
    </div>
    <div v-if="!isMobile" class="search-bar">
      <i class="fa-solid fa-magnifying-glass" />
      <input v-model="searchQuery" type="search" name="search" pattern=".*\S.*" required placeholder="search..."
        @keyup.enter="searchPost()">
    </div>
    <div v-else class="search-bar">
      <i class="fa-solid fa-magnifying-glass" />
      <input v-model="searchQuery" type="search" name="search" pattern=".*\S.*" required placeholder="search..."
        @keyup.enter="searchPostForMobile()">
    </div>
    <TheCategory />
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .container {
    border: 2px solid $background-color;

    .title {
      p {
        &:first-child {
          color: $font-white;
        }

        &:last-child {
          color: $font-white;
        }
      }
    }

    .search-bar {
      border: 1px solid $font-white;

      input {
        color: $font-white;

        &::placeholder {
          color: #999;
        }
      }
    }
  }
}

.container {
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  align-items: center;
  border: 2px solid $font-black;
  border-radius: 10px;
  max-width: 1180px;
  margin: 10px auto;


  @media screen and (min-width: 1025px) {
    height: 330px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0 rem(10);
  }

  @media (max-width: 767px) {
    height: 300px;
    margin: 0 rem(10);
  }

  .title {
    text-align: center;

    @media (max-width: 361px) {
      margin-top: 10px;
    }

    p {
      &:first-child {
        font-size: rem(40);
        font-family: $pretendard;
        font-weight: 600;
        color: $font-black;
      }

      &:last-child {
        font-size: 1.2rem;
        font-family: $pretendard, serif;
        margin: 11px 0;
      }
    }
  }

  .search-bar {
    margin: 14px auto;
    border: 1px solid $font-black;
    border-radius: 5px;
    height: 27px;
    display: flex;
    align-items: center;

    i {
      padding-left: 5px;
    }

    input {
      width: 300px;
      background-color: transparent;
      border: none;
      padding: 3px;
      font-family: $pretendard, serif;

      &:focus::placeholder {
        opacity: 0;
      }

      &::placeholder {
        font-family: $pretendard, serif;
        padding-left: 5px;
        transition: all .3s;
      }
    }
  }
}
</style>