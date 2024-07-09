<script setup lang=ts>
const adminStore = useAdminStore();
</script>
<template>
  <div v-if="adminStore.isUserShow" class="users">
    <h1>Users</h1>
    <div class="user">
      <div class="name">
        redkafe98@gmail.com
      </div>
      <div class="role">
        <select id="user-role" name="role">
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>
    </div>
    <div class="user">
      <div class="name">
        redkafe12@gmail.com
      </div>
      <div class="role">
        <select id="user-role" name="role">
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .users {
    box-shadow: 1px 1px 5px $dim-black !important;
  }
}

.users {
  border-radius: rem(10);
  box-shadow: 3px 3px 10px $light-black;
  margin-top: rem(15);
  width: rem(350);
  padding: rem(10);

  @media (max-width: 767px) {
    width: 100%;
  }

  .user {
    display: flex;
    justify-content: space-between;
    margin: rem(15);

    .role {
      select {
        font-family: $pretendard;
        border-radius: rem(10);
      }
    }
  }
}
</style>