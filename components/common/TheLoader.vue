<script setup lang=ts>

</script>
<template>
  <div class="wrapper">
    <span class="loader"></span>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .wrapper {
    background-color: #121212 !important;
  }

  .loader {
    color: $pearl;
  }
}

.wrapper {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}

.loader {
  color: $black-forest;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-weight: bold;
  font-size: 78px;
  opacity: 0.8;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &:before {
    content: "{";
    display: inline-block;
    animation: pulse 0.4s alternate infinite ease-in-out;
  }

  &:after {
    content: "}";
    display: inline-block;
    animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
  }
}


@keyframes pulse {
  to {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>