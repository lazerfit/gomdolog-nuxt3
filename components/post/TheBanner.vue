<script setup lang=ts>
const searchQuery = ref('');
const store = usePostStore();

const searchPost = async () => {
  useRouter().push(`/post/search/${searchQuery.value}`)
}

</script>
<template>
  <div class="container">
    <div class="title">
      <p>Unlocking the Future with Technology</p>
      <p>Innovate, Integrate, Inspire</p>
    </div>
    <div class="search-bar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" name="search" pattern=".*\S.*" required placeholder="search..." v-model="searchQuery"
        @keyup.enter="searchPost()">
    </div>
    <TheCategory />
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .container {
    border-bottom: 1px solid #555;
    border-top: 1px solid $font-white !important;

    .title {
      p {
        &:first-child {
          background-image: url('/assets/img/textBannerDark.jpg');
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
  border-bottom: 1px solid lightgray;
  border-top: 1px solid $font-black;
  margin-top: 10px;

  @media screen and (min-width: 1024px) {
    height: 330px;
  }

  @media (max-width: 380px) {
    height: 300px;
  }

  .title {
    text-align: center;

    @media (max-width: 361px) {
      margin-top: 10px;
    }

    p {
      &:first-child {
        font-size: rem(40);
        font-family: "Playfair Display", serif;
        font-weight: 600;
        background-image: url('/assets/img/textBanner.jpg');
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }

      &:last-child {
        font-size: 1.2rem;
        font-family: "Playfair Display", serif;
        margin: 11px 0;
      }
    }
  }

  .search-bar {
    margin: 14px auto;
    border: 1px solid rgba(0, 0, 0, 0.315);
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
      font-family: "orbit", serif;

      &:focus::placeholder {
        opacity: 0;
      }

      &::placeholder {
        font-family: "Playfair Display", serif;
        padding-left: 5px;
        transition: all .3s;
      }
    }
  }
}
</style>