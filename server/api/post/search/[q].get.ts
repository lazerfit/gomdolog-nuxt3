import type { PostPageResponseWithoutTags } from "~/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getRouterParam(event,'q');

  const data: PostPageResponseWithoutTags = await $fetch(`${config.public.apiBase}/search?q=${query}`);

  return data;
});