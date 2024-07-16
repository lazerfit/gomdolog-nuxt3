<script setup lang=ts>
const store = useHeaderStore();

const openModal = () => {
  store.isModalOpened = true;
}
</script>
<template>
  <div v-show="!store.isAdmin" class="wrapper">
    <button @click="openModal()">
      Log in
    </button>
  </div>
  <div v-show="store.isAdmin" class="wrapper">
    <button @click="store.isAdminMenuOpened = !store.isAdminMenuOpened">
      Menu
    </button>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  button {
    border: 2px solid $font-white !important;
    color: $font-white !important;

    &::before {
      background-color: $background-color;
    }

    &:hover {
      color: $font-black !important;
    }
  }
}

button {
  @media screen and (max-width: 767px) {
    display: none;
  }

  padding: rem(3) rem(5);
  background-color: transparent;
  border: 2px solid $font-black;
  border-radius: rem(10);
  font-family: $pretendard;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all .3s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: $font-black;
    transition: all .3s ease-in-out;
    z-index: -1;
  }

  &:hover {
    color: $font-white;
  }

  &:hover::before {
    width: 100%;
  }
}
</style>