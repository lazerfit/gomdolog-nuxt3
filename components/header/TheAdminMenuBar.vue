<script setup lang=ts>
import { onClickOutside } from '@vueuse/core';
const store = useHeaderStore();

const logout = () => {
  store.isAdmin = false;
  store.isAdminMenuOpened = false;
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userRole');
}

const target = ref(null);
onClickOutside(target, () => store.isAdminMenuOpened = false);
</script>
<template>
  <div ref="target" class="container">
    <Transition name="bounce">
      <div v-show="store.isAdminMenuOpened" class="wrapper">
        <div>
          <NuxtLink to="/post/new" @click="store.isAdminMenuOpened = false">글쓰기</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/admin" @click="store.isAdminMenuOpened = false">설정</NuxtLink>
        </div>
        <div>
          <button @click="logout">로그아웃</button>
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
    top: rem(7);
    left: rem(-80);
    transform: scale(0) translateX(35%);
    transform-origin: top right;
  }

  50% {
    top: rem(7);
    left: rem(-80);
    transform: scale(1.25) translateX(35%);
    transform-origin: top right;
  }

  100% {
    top: rem(7);
    left: rem(-80);
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
    top: rem(7);
    left: rem(-80);
    transform: translateX(35%);
    margin-top: rem(10);
    background-color: #fff;
    box-shadow: 3px 3px 5px #999;

    div {
      text-align: center;
      padding: rem(5);

      &:hover {
        background-color: $font-black;

        a,
        button {
          color: $font-white;
        }
      }

      a {
        font-size: rem(14);
        cursor: pointer;
        font-family: $pretendard;
        color: $font-black;
        display: inline-block;
        width: 100%;
      }

      button {
        font-size: rem(14);
        cursor: pointer;
        font-family: $pretendard;
        color: $font-black;
        background-color: transparent;
      }
    }
  }
}
</style>