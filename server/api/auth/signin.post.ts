import { JWT } from "~/types";

export default defineEventHandler(async (event) => {
  const body: { email: string, password: string} = await readBody(event);
  const config = useRuntimeConfig();

  const data = await $fetch<JWT>(`${config.public.apiBase}/auth/signin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  });
})