import { defineStore, acceptHMRUpdate } from 'pinia';
import type { IPostTopAdmin, IPostDeleted } from '~/types/model/admin';
import type { ICategory, ICategoryAdmin } from '~/types/model/category';

export const useAdminStore = defineStore('admin', () => {
	const toastStore = useCommonStore();
	const { $api } = useNuxtApp();
	const isCategoryShow = ref(false);
	const isDashboardShow = ref(true);
	const isRecycleBinShow = ref(false);
	const isUserShow = ref(false);
	const categories = ref<ICategory[]>([]);
	const categoryEditable = ref<ICategoryAdmin[]>([]);
	const divList = ref<{ inputValue: string }[]>([]);
	const updateTitle = ref('');
	const postsDeleted = ref<IPostDeleted[]>([]);
	const postTop = ref<IPostTopAdmin[]>([]);

	const fetchAllCategory = async () => {
		await $api.category
			.fetchAll()
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
		return $api.category
			.delete(id)
			.then(() => {
				fetchAllCategory();
			})
			.catch((error) => console.log(error));
	};

	const saveCategory = async (data: string, index: number) => {
		return $api.category
			.save(data)
			.then(() => {
				fetchAllCategory();
				divList.value.splice(index, 1);
			})
			.catch((error) => console.log(error));
	};

	const updateCategory = async (id: number, title: string) => {
		await $api.category
			.update(id, title)
			.then(() => {
				fetchAllCategory();
			})
			.catch((error) => console.log('category update error : ', error));
	};

	const fetchTopPosts = async () => {
		const { data, error } = await useAsyncData('admin-post-top', () =>
			$api.admin.fetchTop()
		);
		if (error.value) {
			console.log(error.value);
		}

		const post = computed(() => data.value ?? []);

		postTop.value = post.value;
	};

	const fetchAllDeletedPosts = async () => {
		const { data, error } = await useAsyncData('admin-post-deleted', () =>
			$api.admin.fetchDeletedPosts()
		);
		if (error.value) {
			console.log(error.value);
		}

		const post = computed(() => data.value ?? []);

		postsDeleted.value = post.value;
	};

	const revertPost = async (id: number) => {
		await $api.admin
			.revertPost(id)
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
				await $api.admin.deletePostPermanent(id).then(() => {
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
		postTop,
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
