<script setup lang=ts>
import { onBeforeMount, ref } from 'vue';

const headerStore = useHeaderStore();
const { signin } = useHeaderStore();
const { fetchAllCategory } = usePostStore();

const filteredCategory = await fetchAllCategory();

const isModalOpened = ref(false);
const isSidebarOpen = ref(false);

const openModal = () => {
  isModalOpened.value = true;
}

const closeModal = () => {
  isModalOpened.value = false;
}

const signIn = async () => {
  await signin();
  isModalOpened.value = false;
  isSidebarOpen.value = false;
}

const logout = () => {
  headerStore.isAdmin = false;
  isSidebarOpen.value = false;
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userRole');
}

onBeforeMount(() => {
  headerStore.setLoginStatus();
})

onBeforeUnmount(() => {
  headerStore.isAdmin = false;
})

</script>
<template>
  <div class="mobile-menu">
    <div class="wrapper">
      <button class="button" data-text="Awesome" @click="isSidebarOpen = !isSidebarOpen">
        <span class="actual-text">&nbsp;menu&nbsp;</span>
        <span aria-hidden="true" class="hover-text">&nbsp;menu&nbsp;</span>
      </button>
      <LazyTheToast />
      <Transition name="bounce">
        <div v-show="isSidebarOpen" class="sidebar">
          <div class="category-wrapper">
            <NuxtLink v-for="(item, index) in filteredCategory" :key="index" :to="`/category/${item.title}`"
              class="category" @click="isSidebarOpen = false">
              {{ item.title }}
            </NuxtLink>
          </div>
          <div class="login-wrapper">
            <div v-show="!headerStore.isAdmin" class="login-btn" @click="openModal">
              로그인
            </div>
            <div v-show="headerStore.isAdmin" class="admin-menu-wrapper">
              <div>
                <NuxtLink to="/post/new" @click="isSidebarOpen = false">글쓰기</NuxtLink>
              </div>
              <div>
                <NuxtLink to="/admin" @click="isSidebarOpen = false">설정</NuxtLink>
              </div>
              <div>
                <a href="#none" @click="logout">로그아웃</a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <LazyTheModal :is-open="isModalOpened" @modal-close="closeModal">
          <template #header>
            <div class="modal-header-container">
              <div class="close-btn">
                <i class="fa-solid fa-x" @click="closeModal" />
              </div>
              <div class="login-welcome">
                <img src="/assets/img/cat4.jpg" alt="login-welcome-img">
              </div>
            </div>
          </template>
          <template #body>
            <div class="modal-body-container">
              <div class="login-field">
                <div>
                  <input v-model="headerStore.signinForm.email" type="email" placeholder="이메일" required>
                </div>
                <div>
                  <input v-model="headerStore.signinForm.password" type="password" placeholder="비밀번호" required>
                </div>
                <button class="btn-member-primary" @click="signIn">로그인</button>
              </div>
            </div>
          </template>
          <template #footer>
            <div />
          </template>
        </LazyTheModal>
      </Transition>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bounce-enter-active {
  animation: bounce-in .3s;
}

.bounce-leave-active {
  animation: bounce-in .3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-in-out;
}

.darkMode {
  .wrapper {
    .button {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6) !important;
      border: none !important;

      &:hover .hover-text {
        filter: drop-shadow(0 0 23px #37ff8b);
      }

      .hover-text {
        border-right: 4px solid #37ff8b !important;
      }
    }

    .sidebar {
      background-color: #121212 !important;

      .category {
        background-color: $font-white !important;
        color: $font-black !important;
      }
    }
  }

}

.mobile-menu {
  @media screen and (min-width: 1024px) {
    display: none;
  }

  @media (min-width:768px) and (max-width: 1023px) {
    display: none;
  }

  .wrapper {
    @include the-menu;

    .sidebar {
      @media screen and (max-width: 767px) {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #f9f9f9;
        left: 0;
        top: 53px;
        transition: .3s ease;
        z-index: 1000;
        overflow: hidden;

        .category-wrapper {
          position: absolute;
          top: 80px;
          left: 50%;
          translate: -50% 0;

          .category {
            display: block;
            text-align: center;
            padding: 5px;
            margin: 10px 0;
            font-family: $sans;
            width: 100px;
            border-radius: 0.7rem;
            box-shadow: 5px 5px 20px rgba($color: #333, $alpha: .17);
            overflow: hidden;

            &:nth-child(1) {
              background-color: #FFDA79;
              border: none;
              color: #FF793F;
              @include box-shadow-animation(#ccae62);
            }

            &:nth-child(2) {
              background-color: #34ace075;
              border: none;
              color: #227093;
              @include box-shadow-animation(#226f938c);
            }

            &:nth-child(3) {
              background-color: #716fd369;
              border: none;
              color: #706FD3;
              @include box-shadow-animation(#47478788);
            }

            &:nth-child(4) {
              background-color: #33d9b26e;
              border: none;
              color: #218C74;
              @include box-shadow-animation(#218c758a);
            }

            &:nth-child(5) {
              background-color: #ff525277;
              border: none;
              color: #B33939;
              @include box-shadow-animation(#b339398e);
            }
          }
        }
      }
    }

    .modal-header-container {
      display: flex;
      flex-direction: column;
      font-family: $sans;

      .close-btn {
        margin-left: auto;
        color: #999;

        i {
          cursor: pointer;
        }
      }

      .login-welcome {
        img {
          width: 100%;
          border-radius: rem(20);
          margin-top: rem(10);
        }
      }
    }

    .modal-body-container {
      margin-bottom: 15px;
      font-family: $sans;

      .login-field {
        button {
          cursor: pointer;
        }

        div {
          :is(input[type=email], input[type=password]) {
            border: 1px solid #ddd;
            padding: rem(13);
            border-radius: rem(5);
            width: 100%;
            margin-top: rem(10);
            font-family: $sans;

            &::placeholder {
              color: #bdbdbd;
              transition: all .3s ease;
              font-family: $sans;
            }

            &:focus::placeholder {
              opacity: 0;
            }
          }
        }

        .btn-member-primary {
          padding: rem(13);
          border-radius: rem(5);
          width: 100%;
          margin-top: rem(10);
          background-color: $font-black;
          color: $font-white;
          transition: all .3s ease-in-out;
          font-family: $sans;

          &:hover {
            @include box-shadow-animation(#777);
          }
        }
      }
    }

    .login-wrapper {
      position: absolute;
      bottom: 80px;
      left: 50%;
      translate: -50% 0;
      width: 100%;
      font-family: $sans;

      .login-btn {
        display: block;
        text-align: center;
        padding: 5px;
        margin: 10px auto;
        width: 100px;
        border-radius: 0.7rem;
        background-color: $font-black;
        color: $font-white;
        @include box-shadow-animation(#999);
        overflow: hidden;
      }

      .admin-menu-wrapper {
        display: flex;
        justify-content: space-between;

        div {
          display: block;
          text-align: center;
          padding: 5px;
          margin: 10px 5px;
          width: 100px;
          border-radius: 0.7rem;
          background-color: $font-black;
          color: $font-white;
          @include box-shadow-animation(#999);
          overflow: hidden;

          a {
            color: $font-white;
          }
        }
      }
    }
  }
}
</style>