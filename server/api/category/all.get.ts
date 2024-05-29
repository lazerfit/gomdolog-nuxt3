import type { Category } from "~/types";

export default defineEventHandler(async (event) => {
  const config=useRuntimeConfig();

  const data: Category[] = await $fetch(`${config.public.apiBase}/category/all`);
  return data;
});