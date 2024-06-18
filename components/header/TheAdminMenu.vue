<script setup lang=ts>

const store = useHeaderStore();
</script>
<template>
  <div v-show="store.isAdmin" class="wrapper">
    <button class="button" data-text="Awesome" @click="store.isAdminMenuOpened = !store.isAdminMenuOpened">
      <span class="actual-text">&nbsp;menu&nbsp;</span>
      <span aria-hidden="true" class="hover-text">&nbsp;menu&nbsp;</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  .wrapper {
    display: none;
  }
}

@include the-menu
</style>