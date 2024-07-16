<script setup lang=ts>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['modal-close', 'submit']);

const target = ref(null);
onClickOutside(target, () => emit('modal-close'));
</script>
<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div ref="target" class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>
        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.darkMode {
  .modal-container {
    background-color: #121212 !important;
  }
}

.modal-mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: $pretendard;

  .modal-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .modal-container {
      width: 360px;
      padding: 20px 30px;
      background-color: $background-color;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

      button {
        cursor: pointer;
      }
    }
  }
}
</style>