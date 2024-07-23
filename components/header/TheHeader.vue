<script setup lang=ts>
import TheToast from '../common/TheToast.vue';

const store = useHeaderStore();
const { signin } = useHeaderStore();

onBeforeMount(() => {
  store.setLoginStatus();
})

onBeforeUnmount(() => {
  store.isAdmin = false;
})
</script>
<template>
  <header>
    <TheToast />
    <div class="sub-logo-container">
      <NuxtLink class="main-logo" to="/">
        <img src="/assets/img/gomdolog3.png" alt="main-logo">
      </NuxtLink>
      <div class="login">
        <LazyTheDarkToggle />
        <LazyTheLoginButtonV2 />
        <LazyMobileSidebar />
        <LazyTheAdminMenuBar />
        <LazyTheModal :is-open="store.isModalOpened" @modal-close="store.isModalOpened = false"
          @keyup.esc="store.isModalOpened = false">
          <template #header>
            <div class="modal-header-container">
              <div class="close-btn">
                <i class="fa-solid fa-x" @click="store.isModalOpened = false" />
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
                  <input v-model="store.signinForm.email" type="email" placeholder="이메일" required>
                </div>
                <div>
                  <input v-model="store.signinForm.password" type="password" placeholder="비밀번호" required
                    @keyup.enter="signin">
                </div>
                <button class="btn-member-primary" @click="signin">로그인</button>
              </div>
            </div>
          </template>
          <template #footer>
            <div />
          </template>
        </LazyTheModal>
      </div>
    </div>
  </header>
</template>

<style lang='scss' scoped>
.darkMode {
  .main-logo {
    img {
      filter: invert(100%);
    }
  }

  header {
    background-color: #121212 !important;
  }
}

header {
  width: 100%;
  margin: rem(15) auto rem(10) auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $background-color;
  position: sticky;
  padding: 15px 10px;
  top: 0;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  .sub-logo-container {
    width: 1180px;
    display: flex;
    align-items: center;

    .main-logo {
      @media screen and (max-width: 767px) {
        margin-right: auto;
      }

      img {
        width: rem(130);

        @media screen and (max-width: 767px) {
          width: 100px;
        }
      }
    }

    .login {
      margin-right: rem(5);
      margin-left: auto;
      display: flex;
      align-items: center;

      .fa-user {
        font-size: rem(23);
        cursor: pointer;
        position: relative;
      }

      .fa-x {
        font-size: rem(10);
        margin-left: auto;
      }

      .modal-header-container {
        display: flex;
        flex-direction: column;

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
              font-family: $pretendard;
              background-color: $background-color;

              &::placeholder {
                color: #bdbdbd;
                transition: all .3s ease;
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
            font-family: $pretendard;

            &:hover {
              @include box-shadow-animation(#777);
            }
          }
        }
      }
    }
  }
}
</style>