import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Category, AdminPopularPosts, PostDeleted } from '~/types';

export const useAdminStore = defineStore('admin', () => {
	const toastStore = useCommonStore();
	const config = useRuntimeConfig();
	const token = useSessionStorage('token', 'none');
	const isCategoryShow = ref(false);
	const isDashboardShow = ref(true);
	const isRecycleBinShow = ref(false);
	const isUserShow = ref(false);
	const categories = ref<Category[]>([]);
	const categoryEditable = ref<Category[]>([]);
	const divList = ref<{ inputValue: string }[]>([]);
	const updateTitle = ref('');
	const postsDeleted = ref<PostDeleted[]>([]);

	const fetchAllCategory = async () => {
		await $fetch<Category[]>(`${config.public.apiBase}/category/all`, {
			method: 'GET',
		})
			.then((response) => {
				categories.value = response;
				categoryEditable.value = response
					.filter((c) => c.title !== '없음')
					.map((c) => {
						return {
							...c,
							isEditable: false,
						};
					});
			})
			.catch((error) => console.log(error));
	};

	const deleteCategory = async (id: number) => {
		return await $fetch(`${config.public.apiBase}/category/delete/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				fetchAllCategory();
			})
			.catch((error) => console.log(error));
	};

	const saveCategory = async (data: string, index: number) => {
		return await $fetch(`${config.public.apiBase}/category/new`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
			body: {
				title: data,
			},
		})
			.then(() => {
				fetchAllCategory();
				divList.value.splice(index, 1);
			})
			.catch((error) => console.log(error));
	};

	const updateCategory = async (id: number, title: string) => {
		await $fetch(`${config.public.apiBase}/category/update`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
			body: {
				id: id,
				title: title,
			},
		})
			.then(() => {
				fetchAllCategory();
			})
			.catch((error) => console.log('category update error : ', error));
	};

	const fetchTopPosts = async () => {
		return await useFetch<AdminPopularPosts[]>('/api/post/popular/top5', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
			params: { limit: 5 },
		});
	};

	const fetchAllDeletedPosts = async () => {
		await $fetch<PostDeleted[]>(`${config.public.apiBase}/post/recycling`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				postsDeleted.value = response;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const revertPost = async (id: number) => {
		await $fetch(`${config.public.apiBase}/post/revertDelete/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				fetchAllDeletedPosts();
				toastStore.setToast('복구에 성공하였습니다.', 'check');
			})
			.catch((error) => {
				toastStore.setToast(
					'오류가 발생하였습니다.\n다시 시도해주세요.',
					'error'
				);
				console.log(error);
			});
	};

	const deletePostPermanent = async (id: number) => {
		const confirmed = window.confirm(
			'삭제하시면 복구하실 수 없습니다.\n정말 삭제하시겠습니까?'
		);
		try {
			if (confirmed) {
				await $fetch(`${config.public.apiBase}/post/deletePermanent/${id}`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token.value}`,
						'Content-Type': 'application/json',
					},
				}).then(() => {
					fetchAllDeletedPosts();
					toastStore.setToast('성공적으로 삭제하였습니다.', 'check');
				});
			}
		} catch (error) {
			console.log(error);
			toastStore.setToast(
				'삭제에 실패하였습니다.\n확인 후 다시 시도해주세요.',
				'error'
			);
		}
	};

	return {
		isCategoryShow,
		isDashboardShow,
		isRecycleBinShow,
		isUserShow,
		categories,
		divList,
		updateTitle,
		categoryEditable,
		postsDeleted,
		fetchAllCategory,
		deleteCategory,
		saveCategory,
		updateCategory,
		fetchTopPosts,
		fetchAllDeletedPosts,
		revertPost,
		deletePostPermanent,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot));
}
