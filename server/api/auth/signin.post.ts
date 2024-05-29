export default defineEventHandler(async (event) => {
  const body: { email: string, password: string} = await readBody(event);
  const config = useRuntimeConfig();

  await $fetch(`${config.public.apiBase}/auth/signin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  });
})