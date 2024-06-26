import type { Category } from '~/types';

export default defineEventHandler(async () => {
	const config = useRuntimeConfig();

	const data = await $fetch<Category[]>(
		`${config.public.apiBase}/category/all`
	);
	return data;
});
