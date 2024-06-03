import type { Post } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event,'id');
    const config=useRuntimeConfig();
    const data: Post = await $fetch(`${config.public.apiBase}/post/${id}`);
  
    return data
  } catch(error) {
    console.log(error);
  }
})