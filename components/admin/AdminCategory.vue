<script setup lang=ts>
import type { Category } from '~/types';

const adminStore = useAdminStore();
const config = useRuntimeConfig();
const token = sessionStorage.getItem('token');
const categoryEditable = ref<Category[]>([]);

const addDiv = () => {
  adminStore.divList.push({ inputValue: '' });
}

const editTitle = (item: Category) => {
  item.isEditable = !item.isEditable
  adminStore.updateTitle = item.title;
}

function fetchAll() {
  $fetch<Category[]>(`${config.public.apiBase}/category/all`, {
    method: 'GET'
  })
    .then((response) => {
      adminStore.categories = response
      makeCategyEditable()
    })
    .catch((error) => console.log(error))
}

fetchAll();

function makeCategyEditable() {
  categoryEditable.value = adminStore.categories
    .filter(category => category.title !== '없음')
    .map((category) => {
      return {
        ...category,
        isEditable: false
      }
    })
}

const categorySave = async (data: string, index: number) => {
  await $fetch(`${config.public.apiBase}/category/new`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: {
      title: data
    }
  })
    .then(() => {
      fetchAll()
      adminStore.divList.splice(index, 1)
    })
    .catch(error => console.log('category save error : ', error));
};

const deleteCategory = async (id: number) => {
  await $fetch(`${config.public.apiBase}/category/delete/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(() => {
    fetchAll()
  })
    .catch(error => console.log('category delete error : ', error));
}

const updateCategory = async (id: number, title: string) => {
  await $fetch(`${config.public.apiBase}/category/update`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: {
      id: id,
      title: title
    }
  }).then(() => {
    fetchAll()
  })
    .catch(error => console.log('category update error : ', error));
}
</script>
<template>
  <div v-if="adminStore.isCategoryShow" class="category-container">
    <h1>Category</h1>
    <div class="categories">
      <div v-for="item in categoryEditable" :key="item.id" class="category">
        <div v-if="!item.isEditable" class="title">
          {{ item.title }}
        </div>
        <input v-else v-model="adminStore.updateTitle" type="text" placeholder="change title..."
          @keyup.enter="updateCategory(item.id, adminStore.updateTitle)">
        <div class="btns">
          <i class="fa-solid fa-rotate" @click="editTitle(item)" />
          <i class="fa-solid fa-trash" @click="deleteCategory(item.id)" />
        </div>
      </div>
      <div v-for="(item, index) in adminStore.divList" :key="index" class="add-div">
        <input v-model="item.inputValue" type="text" placeholder="type something.."
          @keyup.enter="categorySave(item.inputValue, index)">
        <button @click="categorySave(item.inputValue, index)">
          <i class="fa-solid fa-plus" />
        </button>
        <span>
          <i class="fa-solid fa-minus" @click="adminStore.divList.splice(index, 1)" />
        </span>
      </div>
      <button class="add-div-btn" @click="addDiv">
        <i class="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .fa-plus {
    color: $font-white;
  }

  .categories {
    box-shadow: 1px 1px 5px #555 !important;
  }
}

.category-container {
  margin: 0 rem(20);
  width: 100%;

  @media (max-width: 767px) {
    width: 100%;
  }

  .categories {
    border-radius: rem(10);
    box-shadow: 3px 3px 10px #999;
    margin-top: rem(15);
    padding: rem(10);
    text-align: center;

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 30px;
    }

    .category {
      margin: rem(15);
      display: flex;

      input {
        @include basic-input
      }

      .btns {
        margin-left: auto;

        i {
          margin-right: rem(5);
          cursor: pointer;
          color: #999;
          transition: all .3s ease;

          &:hover {
            color: $font-black;
          }
        }
      }
    }

    .add-div {

      input {
        max-width: rem(150);
        border: none;
        border-bottom: 1px solid #555;
        height: rem(23);
        transition: all .3s ease-in-out;
        font-family: $pretendard;
        padding-left: rem(2);

        &:focus::placeholder {
          opacity: 0;
        }

        &::placeholder {
          font-family: $pretendard;
          font-size: 1.3rem;
          font-weight: 600;
          transition: all .3s ease-in-out;
        }
      }

      button {
        border: none;
        background-color: transparent;
        margin-top: rem(10);
        margin-left: rem(10);
        padding: rem(3);
        color: #bdbdbd;
        transition: all .3s ease-in-out;

        &:hover {
          color: $font-black;
        }
      }

      span {
        margin-left: rem(5);
        color: #bdbdbd;
        transition: all .3s ease-in-out;

        &:hover {
          color: $font-black;
        }
      }
    }

    .add-div-btn {
      border: none;
      background-color: transparent;
      margin-top: rem(20);
      padding: rem(3);
    }
  }
}
</style>