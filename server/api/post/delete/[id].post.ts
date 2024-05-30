export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event,'id');

  await $fetch(`${config.public.apiBase}/post/delete/${id}`);
});