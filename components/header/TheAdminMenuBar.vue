<script setup lang=ts>
import { RouterLink } from 'vue-router';

const store = useHeaderStore();

const logout = () => {
  store.isAdmin = false;
  store.isAdminMenuOpened = false;
  sessionStorage.removeItem('userRole');
}
</script>
<template>
  <div class="container">
    <Transition name="bounce">
      <div class="wrapper" v-show="store.isAdminMenuOpened">
        <div>
          <RouterLink to="/post/new" @click="store.isAdminMenuOpened = false">글쓰기</RouterLink>
        </div>
        <div>
          <RouterLink to="/admin" @click="store.isAdminMenuOpened = false">설정</RouterLink>
        </div>
        <div>
          <a href="#none" @click="logout">로그아웃</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang='scss' scoped>
.container {
  position: relative;

  @media screen and (max-width: 767px) {
    display: none;
  }

  .wrapper {
    position: absolute;
    border: 1px solid #000;
    width: px-to-rem(65);
    top: 100%;
    left: px-to-rem(-95);
    transform: translateX(35%);
    margin-top: px-to-rem(10);
    background-color: #fff;
    box-shadow: 3px 3px 5px $light-black;

    div {
      text-align: center;
      padding: px-to-rem(5);

      &:hover {
        background-color: $black-forest;

        a {
          color: $pearl;
        }
      }

      a {
        font-size: px-to-rem(13);
        cursor: pointer;
        font-family: $secondary-font;
        color: $black-forest;
      }
    }
  }
}
</style>