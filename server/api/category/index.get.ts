import type { PostPageResponseWithoutTags } from '@/types';
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const query = getQuery(event);

	const data: PostPageResponseWithoutTags = await $fetch(
		`${config.public.apiBase}/post/category`,
		{
			params: {
				title: query.title,
				page: query.page,
				size: query.size,
			},
		}
	);

	return data;
});
