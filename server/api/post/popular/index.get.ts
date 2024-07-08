import type { PostResopnseWithoutTags } from '~/types';
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const query = getQuery(event);

	const data = await $fetch<PostResopnseWithoutTags[]>(
		`${config.public.apiBase}/post/popular?limit=${query.limit}`
	);
	return data;
});
