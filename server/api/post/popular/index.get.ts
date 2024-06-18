import type { PostResopnseWithoutTags } from '~/types';
export default defineEventHandler(async () => {
	const config = useRuntimeConfig();

	const data: PostResopnseWithoutTags[] = await $fetch(
		`${config.public.apiBase}/post/popular`
	);
	return data;
});
