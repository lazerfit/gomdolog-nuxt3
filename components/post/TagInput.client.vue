<script setup>
import { onMounted, ref } from "vue";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

const props = defineProps({
  modelValue: {
    type: Array,
  }
});

const emits = defineEmits(["update:modelValue"]);

const inputRef = ref();
const tagify = ref();

function handleChange(e) {
  const str = e.target.value;
  if (!str) emits("update:modelValue", []);
  else {
    const ans = str.split(",");
    emits("update:modelValue", ans);
  }
}

onMounted(() => {
  tagify.value = new Tagify(inputRef.value, {
    originalInputValueFormat: (valuesArr) =>
      valuesArr.map((item) => item.value).join(","),
  });
  tagify.value.loadOriginalValues(props.modelValue);
});
</script>
<template>
  <input ref="inputRef" @change="handleChange">
</template>
