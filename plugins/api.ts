import PostModule from '@/utils/repository/module/post.module';
import CategoryModule from '@/utils/repository/module/category.module';
import AdminModule from '@/utils/repository/module/admin.module';
declare module 'nuxt/app' {
	interface NuxtApp {
		$api: IApiInstance;
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$api: IApiInstance;
	}
}

export interface IApiInstance {
	post: PostModule;
	category: CategoryModule;
	admin: AdminModule;
}

export default defineNuxtPlugin(() => {
	const apiFetcher = $fetch.create({});

	const postModule = new PostModule(apiFetcher);
	const categoryModule = new CategoryModule(apiFetcher);
	const adminModule = new AdminModule(apiFetcher);

	const api: IApiInstance = {
		post: postModule,
		category: categoryModule,
		admin: adminModule,
	};

	return {
		provide: {
			api,
		},
	};
});
