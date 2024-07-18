import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStorage } from '@vueuse/core';
import type {
	PostPageResponseWithoutTags,
	PostSave,
	PostDeleted,
	PostResopnseWithoutTags,
	PostDetail,
	Category,
} from '~/types';

export const usePostStore = defineStore('post', () => {
	const config = useRuntimeConfig();
	const toastStore = useCommonStore();
	const router = useRouter();
	const token = useSessionStorage('token', 'none');
	const pageSize = 6;
	const postsPage = ref<PostPageResponseWithoutTags>({
		content: [],
		numberOfElements: 0,
		size: 0,
		totalElements: 0,
		totalPages: 0,
		first: false,
		last: false,
		number: 0,
	});
	const postSaveForm = ref<PostSave>({
		title: '',
		content: '',
		categoryTitle: '',
		tags: [],
	});
	const post = ref({
		id: 0,
		title: '',
		content: '',
		createdDate: '',
		updatedDate: '',
		tags: [''],
		summary: '',
	});
	const postsDeleted = ref<PostDeleted[]>([]);

	const fetchAll = async () => {
		const { data } = await useFetch<PostPageResponseWithoutTags>(
			'/api/post/all',
			{
				params: {
					page: 0,
					size: pageSize,
				},
			}
		);
		const post = initializePostPage(data);

		postsPage.value = post.value;
	};

	const changePage = async (pageNum: number) => {
		const { data } = await useAsyncData<PostPageResponseWithoutTags>(() =>
			$fetch(`/api/post/all`, {
				method: 'GET',
				params: {
					page: pageNum,
					size: pageSize,
				},
			})
		);

		const post = initializePostPage(data);

		postsPage.value = post.value;
	};

	const deleteById = async (postId: number) => {
		const confirmed = window.confirm('정말 삭제하시겠습니까?');
		try {
			if (confirmed) {
				await $fetch(`${config.public.apiBase}/post/delete/${postId}`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token.value}`,
						'Content-Type': 'application/json',
					},
				});
				router.push('/');
			} else {
				return;
			}
		} catch {
			toastStore.setToast('삭제에 실패하였습니다.', 'error');
		}
	};

	const addViews = async (postId: number) => {
		await useFetch(`/api/post/${postId}/views`, { method: 'POST' }).catch(
			(error) => console.log(error)
		);
	};

	const fetchAllTop = async () => {
		const data = await useFetch<PostResopnseWithoutTags[]>(
			'/api/post/popular',
			{
				params: {
					limit: 3,
				},
			}
		);

		return computed(() => data.data.value ?? []);
	};

	const fetchById = async (postId: number) => {
		const { data } = await useFetch<PostDetail>(`/api/post/${postId}`);

		const postData = computed(
			() =>
				data.value ?? {
					id: 0,
					title: '',
					content: '',
					createdDate: '',
					updatedDate: '',
					tags: [''],
					summary: '',
				}
		);

		post.value = postData.value;
	};

	const save = async () => {
		await $fetch(`${config.public.apiBase}/post/new`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token.value}`,
				'Content-Type': 'application/json',
			},
			body: {
				title: postSaveForm.value.title,
				content: postSaveForm.value.content,
				categoryTitle: postSaveForm.value.categoryTitle,
				tags: postSaveForm.value.tags,
			},
		})
			.then(() => {
				postSaveForm.value.title = '';
				postSaveForm.value.content = '';
				postSaveForm.value.tags = [];
				useStorage('draft', 'none').value = null;
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
				toastStore.setToast(
					'예기치 않은 오류가 발생하였습니다.\n잠시 후 다시 시도해주십시오.',
					'error'
				);
			});
	};

	const fetchAllCategory = async () => {
		const { data } = await useFetch<Category[]>('/api/category/all');
		return computed(() => data.value?.filter((c) => c.title !== '없음') ?? []);
	};

	const fetchAllByCategoryTitle = async (title: string, page: string) => {
		const { data } = await useFetch<PostPageResponseWithoutTags>(
			'/api/post/category',
			{
				params: {
					title: title,
					page: page,
					size: 9,
				},
			}
		);

		if (data.value?.numberOfElements === 0) {
			showError({ statusCode: 404, statusMessage: 'page not found' });
			return;
		}

		const post = initializePostPage(data);

		postsPage.value = post.value;
	};

	const fetchAllByTitle = async (title: string, page: string) => {
		const { data } = await useFetch<PostPageResponseWithoutTags>(
			`/api/post/search`,
			{
				params: {
					title: title,
					page: page,
					size: 9,
				},
			}
		);

		if (data.value?.numberOfElements === 0) {
			showError({ statusCode: 404, statusMessage: 'page not found' });
		}

		const post = initializePostPage(data);
		postsPage.value = post.value;
	};

	return {
		postsPage,
		pageSize,
		postSaveForm,
		postsDeleted,
		post,
		fetchAll,
		changePage,
		deleteById,
		addViews,
		fetchAllTop,
		fetchById,
		save,
		fetchAllCategory,
		fetchAllByCategoryTitle,
		fetchAllByTitle,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}

const initializePostPage = (
	data: globalThis.Ref<PostPageResponseWithoutTags | null>
) => {
	return computed(
		() =>
			data.value ?? {
				content: [],
				numberOfElements: 0,
				size: 0,
				totalElements: 0,
				totalPages: 0,
				first: false,
				last: false,
				number: 0,
			}
	);
};
