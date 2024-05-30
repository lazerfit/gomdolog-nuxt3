import { useRouter } from "vue-router";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const contentType = getHeader(event,'Content-Type') || 'application/json';
  const authorization = getHeader(event,'Authorization') || '';
  const body = readBody(event);

  $fetch(`${config.public.apiBase}/post/update`,{
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Content-Type': contentType
    },
    body: body
  }).then(() => {
    useRouter().push('/');
  }).catch(error => console.log(error))
});