<script setup lang=ts>

</script>
<template>
  <div class="container">
    <AdminAside />
    <div class="main-content-container">
      <div class="content-wrapper">
        <AdminPopularPosts />
        <div class="user-container">
          <AdminUserList />
        </div>
        <AdminCategory />
        <AdminRecycleBin />
        <TheToast />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .main-content-container {
    box-shadow: 1px 1px 5px #555 !important;
  }
}

.container {
  width: 1180px;
  display: flex;
  margin: rem(40) auto;
  font-family: $sans;

  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }

  @media (min-width:768px) and (max-width: 1024px) {
    width: 100%;
  }

  h1 {
    font-size: 1.5rem;
    font-family: $playfair;
  }

  .main-content-container {
    width: 84%;
    margin-left: auto;
    border: 1px solid #000;
    margin: rem(30) 0;
    border-radius: rem(10);
    box-shadow: 5px 5px 5px #999;

    @media (max-width: 767px) {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      margin: 0;
    }

    .content-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      @media (max-width: 767px) {
        width: 100%;
        display: flex;
        margin: 0;
      }

      .user-container {
        margin: rem(20);
        width: 40%;

        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }
  }
}
</style>