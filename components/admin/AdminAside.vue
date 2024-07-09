<script setup lang=ts>

const adminStore = useAdminStore();

const makeNotShowAll = () => {
  adminStore.isCategoryShow = false;
  adminStore.isDashboardShow = false;
  adminStore.isRecycleBinShow = false;
  adminStore.isUserShow = false;
}

const categoryShow = () => {
  makeNotShowAll()
  adminStore.isCategoryShow = !adminStore.isCategoryShow
}

const dashboardShow = () => {
  makeNotShowAll()
  adminStore.isDashboardShow = !adminStore.isDashboardShow;
}

const recycleBinShow = () => {
  makeNotShowAll()
  adminStore.isRecycleBinShow = !adminStore.isRecycleBinShow;
}
</script>
<template>
  <aside>
    <div class="content-wrapper">
      <input id="home" type="radio" name="asdie" value="home" checked>
      <label for="home">
        <div class="dashboard menu" @click="dashboardShow">
          <span>
            <i class="fa-solid fa-house" />
          </span>
          <span class="title">
            Home
          </span>
        </div>
      </label>
      <input id="category" type="radio" name="asdie" value="category">
      <label for="category">
        <div class="category menu" @click="categoryShow">
          <span>
            <i class="fa-solid fa-table-list" />
          </span>
          <span class="title">
            Category
          </span>
        </div>
      </label>
      <input id="recycleBin" type="radio" name="asdie" value="recycleBin">
      <label for="recycleBin">
        <div class="recycleBin menu" @click="recycleBinShow">
          <span>
            <i class="fa-regular fa-trash-can" />
          </span>
          <span class="title">
            Recycle
          </span>
        </div>
      </label>
    </div>
  </aside>
</template>

<style lang='scss' scoped>
.darkMode {
  aside {
    box-shadow: 1px 1px 5px #555;
  }

  input[type="radio"] {
    display: none;

    &:checked+label>div {
      background-color: $font-white !important;
      color: $font-black !important;
    }
  }
}

aside {
  border: 1px solid #000;
  width: rem(160);
  height: rem(1050);
  margin: rem(30) rem(30) rem(30) 0;
  border: 1px solid #000;
  border-radius: rem(10);
  box-shadow: 5px 5px 5px #999;

  @media (max-width: 767px) {
    height: 50px;
    width: 100%;
  }

  .content-wrapper {
    margin: rem(20);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: rem(15);
    transition: all .3s ease;

    .menu {
      padding: 5px;
      border-radius: 5px;
    }

    @media (max-width: 767px) {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      margin: 0;

      .title {
        display: none;
      }
    }

    input[type="radio"] {
      display: none;

      &:checked+label>div {
        background-color: #121212;
        color: $font-white;
      }
    }

    span {
      font-family: $pretendard;
      cursor: pointer;
    }

    .title {
      font-weight: 500;

      &:hover {
        text-shadow: 1px 1px 2px #999;
      }
    }
  }
}
</style>