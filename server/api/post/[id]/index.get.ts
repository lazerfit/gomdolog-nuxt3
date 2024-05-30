import type { Post } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event,'id');
  const config=useRuntimeConfig();
  const data: Post = await $fetch(`${config.public.apiBase}/post/${id}`);

  return data
})