import type { PostDeleted } from "~/types";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = $fetch<PostDeleted[]>(`${config.public.apiBase}/post/recycling`);
  return data;
});