<script setup lang=ts>

</script>
<template>
  <div class="test" />
  <div class="container">
    <div class="content-wrapper">
      <div class="copywrite">
        @Designed By gomdolog.
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .test {
    height: 5px !important;
    background-color: $darkmode-point-color;
  }

  .container {
    background-color: #222831;

    .content-wrapper {
      color: $gray-4 !important;

      .sns {
        span {
          a {
            color: $gray-4 !important;
          }
        }
      }
    }
  }
}

.test {
  height: 10px;
  width: 100%;
  background-color: #E9FF92;
}

.container {

  width: 100%;
  height: rem(140);
  display: flex;
  box-sizing: border-box;
  background-color: #191825;

  @media screen and (max-width: 767px) {
    height: 100px;
    box-sizing: border-box;
    margin: 0;
  }

  .content-wrapper {
    width: 1180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    color: $font-white;

    @media screen and (max-width: 767px) {
      width: 100%;
    }

    .copywrite {
      margin-top: rem(5);
      font-family: $sans;
      font-weight: 500;
    }
  }
}
</style>