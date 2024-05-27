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
    border-top: 1px solid $pearl !important;

    .content-wrapper {
      color: $pearl !important;

      .sns {
        span {
          a {
            color: $pearl !important;
          }
        }
      }
    }
  }
}

.container {
  width: 100%;
  height: px-to-rem(120);
  display: flex;
  border-top: 1px solid $black-forest;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    height: 100px;
  }

  .content-wrapper {
    width: $desktop-width;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    color: $black-forest;

    @media screen and (max-width: 767px) {
      width: 100%;
    }

    .sns {
      span {
        a {
          margin-right: px-to-rem(5);
          font-size: px-to-rem(20);
          color: $black-forest;
        }
      }
    }

    .copywrite {
      margin-top: px-to-rem(5);
    }
  }
}
</style>