import type { PostPageResponseWithoutTags } from "~/types";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getRouterParam(event,'q');

  const data = await $fetch<PostPageResponseWithoutTags>(`${config.public.apiBase}/post/category`,{
    method: 'GET',
    params: {
      q: query
    }
  })

  return data;
});