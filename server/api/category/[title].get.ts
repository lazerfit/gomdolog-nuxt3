import type { PostPageResponseWithoutTags } from "~/types";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const title = getRouterParam(event,'title');

  const data: PostPageResponseWithoutTags = await $fetch(`${config.public.apiBase}/post/category`,{
    params: {
      title: title
    }
  })

  return data;
});