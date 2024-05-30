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
          <NuxtLink to="/post/new" @click="store.isAdminMenuOpened = false">글쓰기</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/admin" @click="store.isAdminMenuOpened = false">설정</NuxtLink>
        </div>
        <div>
          <a href="#none" @click="logout">로그아웃</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang='scss' scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    top: 100%;
    left: rem(-95);
    transform: scale(0) translateX(35%);
    transform-origin: top right;
  }

  50% {
    top: 100%;
    left: rem(-95);
    transform: scale(1.25) translateX(35%);
    transform-origin: top right;
  }

  100% {
    top: 100%;
    left: rem(-95);
    transform: scale(1) translateX(35%);
    transform-origin: top right;
  }
}

.container {
  position: relative;
  font-size: 0.9rem;

  @media screen and (max-width: 767px) {
    display: none;
  }

  .wrapper {
    position: absolute;
    border: 1px solid #000;
    width: rem(65);
    top: 100%;
    left: rem(-95);
    transform: translateX(35%);
    margin-top: rem(10);
    background-color: #fff;
    box-shadow: 3px 3px 5px #999;

    div {
      text-align: center;
      padding: rem(5);

      &:hover {
        background-color: $font-black;

        a {
          color: $font-white;
        }
      }

      a {
        font-size: rem(14);
        cursor: pointer;
        font-family: $sans;
        color: $font-black;
      }
    }
  }
}
</style>