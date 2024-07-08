import type { PostDetail } from '~/types';

export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, 'id');
		const config = useRuntimeConfig();
		const data = await $fetch<PostDetail>(
			`${config.public.apiBase}/post/${id}`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
});
