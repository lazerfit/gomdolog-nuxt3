<script setup lang=ts>

</script>
<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="sns">
        <span>
          <a target="_blank" href="https://github.com/lazerfit">
            <i class="fa-brands fa-github"></i>
          </a>
        </span>
        <span>
          <a target="_blank" href="https://www.linkedin.com/in/ddoddi14/">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </span>
      </div>
      <div class="copywrite">
        @Designed By gomdolog.
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .container {
    border-top: 1px solid $font-white !important;

    .content-wrapper {
      color: $font-white !important;

      .sns {
        span {
          a {
            color: $font-white !important;
          }
        }
      }
    }
  }
}

.container {

  width: 100%;
  height: rem(120);
  display: flex;
  border-top: 1px solid $font-black;
  box-sizing: border-box;

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
    color: $font-black;

    @media screen and (max-width: 767px) {
      width: 100%;
    }

    .sns {
      span {
        a {
          margin-right: rem(5);
          font-size: rem(20);
          color: $font-black;
        }
      }
    }

    .copywrite {
      margin-top: rem(5);
    }
  }
}
</style>