import type { AdminPopularPosts } from "~/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const contentType = getHeader(event,'Content-Type') || 'application/json';
  const authorization = getHeader(event,'Authorization') || '';

  const data = await $fetch<AdminPopularPosts[]>(`${config.public.apiBase}/post/popular/top5`, {
    headers: {
      'Content-Type':contentType,
      'Authorization': authorization
    }
  }).catch(error => {
    console.log(error);
  });

  return data;
});