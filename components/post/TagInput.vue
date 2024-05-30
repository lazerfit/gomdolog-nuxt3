<template>
  <input ref="inputRef" @change="handleChange" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

const props = defineProps(["modelValue"]);

const emits = defineEmits(["update:modelValue"]);

const inputRef = ref();
let tagify = ref();

function handleChange(e) {
  let str = e.target.value;
  if (!str) emits("update:modelValue", []);
  else {
    let ans = str.split(",");
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
