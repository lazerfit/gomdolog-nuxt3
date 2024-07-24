import { useNuxtApp } from 'nuxt/app';

export const cachedPostTop = defineCachedFunction(
	async () => {
		const { $api } = useNuxtApp();
		const data = await $api.post.fetchTop();

		return data;
	},
	{
		maxAge: 60 * 60,
		name: 'post-top',
		getKey: () => 'post-top',
	}
);
