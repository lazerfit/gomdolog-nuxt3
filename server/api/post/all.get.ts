import type { PostPageResponseWithoutTags } from "~/types";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const data: PostPageResponseWithoutTags = await $fetch(`${config.public.apiBase}/post/all`);
  return data;
});