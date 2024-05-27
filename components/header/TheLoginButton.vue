<script setup lang=ts>
const store = useHeaderStore();

const openModal = () => {
  store.isModalOpened = true;
}
</script>
<template>
  <div class="wrapper" v-if="!">
    <button class="button" data-text="Awesome" @click="openModal()">
      <span class="actual-text">&nbsp;login&nbsp;</span>
      <span aria-hidden="true" class="hover-text">&nbsp;login&nbsp;</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
$border-right: 4px;
$text-stroke-color: rgba(0, 0, 0, 0.479);
$animation-color: #37ff8a94;
$fs-size: 1em;

.darkMode {
  .button {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6) !important;

    &:hover .hover-text {
      filter: drop-shadow(0 0 23px #37FF8B)
    }

    .hover-text {
      border-right: 4px solid #37FF8B !important;
    }
  }
}

.button {
  @media screen and (max-width: 767px) {
    display: none;
  }

  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  letter-spacing: 1.5px;
  text-decoration: none;
  font-size: $fs-size;
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px $text-stroke-color;

  &:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px $animation-color)
  }

  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: $animation-color;
    width: 0%;
    inset: 0;
    border-right: $border-right solid $animation-color;
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px $animation-color;
  }
}
</style>