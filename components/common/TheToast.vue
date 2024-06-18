<script setup lang=ts>

const store = useCommonStore();

</script>
<template>
  <Teleport to="body">
    <div v-if="store.isToastOpened" class="toast">
      <i v-if="store.toastStatus === 'check'" class="fa-solid fa-circle-check" />
      <i v-else-if="store.toastStatus === 'error'" class="fa-solid fa-circle-xmark" />
      {{ store.toastMessage }}
    </div>
  </Teleport>
</template>

<style lang='scss' scoped>
.toast {
  display: inline-block;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: rem(10) rem(20);
  background-color: $font-black;
  color: $font-white;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba($color: #333, $alpha: .25);
  animation: toast-bounce .2s linear;
  z-index: 10000;

  @media (max-width: 767px) {
    max-width: 90vw;
  }

  i {
    margin-right: px-to-rem(5);
  }

  .fa-circle-check {
    color: #2ecc71;
  }

  .fa-circle-xmark {
    color: crimson;
  }
}
</style>