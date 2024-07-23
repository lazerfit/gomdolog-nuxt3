import { defineStore, acceptHMRUpdate } from 'pinia';
import type {
	IPostSaveForm,
	IPostPage,
	IPostDeleted,
} from '~/types/model/post';

export const usePostStore = defineStore('post', () => {
	const { $api } = useNuxtApp();
	const { setToast } = useCommonStore();
	const router = useRouter();
	const isPending = ref(false);
	const isLast = ref(false);
	const postsPage = ref<IPostPage>({
		content: [],
		pageable: {},
		size: 0,
		number: 0,
		sort: {},
		first: false,
		last: false,
		numberOfElements: 0,
		empty: false,
		totalElements: 0,
		totalPages: 0,
	});
	const postSaveForm = ref<IPostSaveForm>({
		title: '',
		content: '',
		categoryTitle: '',
		tags: [],
	});
	const postsDeleted = ref<IPostDeleted[]>([]);

	const fetchAll = async () => {
		const { data, error } = await useAsyncData(() => $api.post.fetchAll(0));
		if (error.value) {
			console.log(error.value);
		}
		const post = initializePostPage(data);

		postsPage.value = post.value;
	};

	const changePage = async (pageNum: number) => {
		const data = await $api.post.fetchAll(pageNum);

		postsPage.value = data;
	};

	const save = async () => {
		isPending.value = true;
		try {
			await $api.post
				.save(postSaveForm.value)
				.then(() => {
					postSaveForm.value = {
						title: '',
						content: '',
						categoryTitle: '',
						tags: [],
					};
					router.push('/');
				})
				.catch((e) => {
					console.log(e);
					setToast('잠시 후 다시 시도해주십시오.', 'error');
				});
		} finally {
			isPending.value = false;
		}
	};

	const update = async (id: number) => {
		isPending.value = true;
		try {
			await $api.post
				.update(id, postSaveForm.value)
				.then(() => {
					postSaveForm.value = {
						title: '',
						content: '',
						categoryTitle: '',
						tags: [],
					};
					router.push('/');
				})
				.catch((e) => {
					console.log(e);
					setToast('잠시 후 다시 시도해주십시오.', 'error');
				});
		} finally {
			isPending.value = false;
		}
	};

	const deleteById = async (postId: number) => {
		const confirmed = window.confirm('정말 삭제하시겠습니까?');
		isPending.value = true;
		try {
			if (confirmed) {
				await $api.post
					.delete(postId)
					.then(() => router.push('/'))
					.catch((e) => console.log(e));
			} else {
				return;
			}
		} catch {
			setToast('잠시 후 다시 시도해주세요.', 'error');
		} finally {
			isPending.value = false;
		}
	};

	const addViews = async (postId: number) => {
		await $api.post.addViews(postId).catch((e) => console.log(e));
	};

	const fetchAllTop = async () => {
		const { data } = await useAsyncData(() => $api.post.fetchTop());

		return computed(() => data.value ?? []);
	};

	const fetchById = async (postId: number) => {
		const { data, error } = await useAsyncData(`post-detail-${postId}`, () =>
			$api.post.fetchDetail(postId)
		);

		if (error.value) {
			console.log(error.value);
		}

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

		return postData.value;
	};

	const fetchUpdateForm = async (id: number) => {
		const { data, error } = await useAsyncData(() =>
			$api.post.fetchUpdateForm(id)
		);

		if (error.value) {
			console.log(error.value);
		}

		const post = computed(
			() =>
				data.value ?? {
					title: '',
					content: '',
					categoryTitle: '',
					tags: [],
				}
		);

		postSaveForm.value = post.value;
	};

	const fetchAllCategory = async () => {
		const { data } = await useAsyncData(() => $api.category.fetchAll());
		return computed(() => data.value?.filter((c) => c.title !== '없음') ?? []);
	};

	const fetchAllByCategoryTitle = async (title: string, page: string) => {
		const { data, error } = await useAsyncData(() =>
			$api.post.fetchAllByCategory(title, page)
		);

		if (error.value) {
			console.log(error.value);
		}

		if (data.value?.numberOfElements === 0) {
			showError({ statusCode: 404, statusMessage: 'page not found' });
			return;
		}

		const post = initializePostPage(data);

		postsPage.value = post.value;
	};

	const fetchAllByTitle = async (title: string, page: string) => {
		const { data, error } = await useAsyncData(() =>
			$api.post.fetchAllByTitle(title, page)
		);

		if (error.value) {
			console.log(error.value);
		}

		if (data.value?.numberOfElements === 0) {
			showError({ statusCode: 404, statusMessage: 'page not found' });
		}

		const post = initializePostPage(data);
		postsPage.value = post.value;
	};

	return {
		isPending,
		postsPage,
		postSaveForm,
		postsDeleted,
		isLast,
		fetchAll,
		changePage,
		save,
		update,
		deleteById,
		addViews,
		fetchAllTop,
		fetchById,
		fetchAllCategory,
		fetchAllByCategoryTitle,
		fetchAllByTitle,
		fetchUpdateForm,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}

const initializePostPage = (data: globalThis.Ref<null | IPostPage>) => {
	return computed(
		() =>
			data.value ?? {
				content: [],
				pageable: {},
				size: 0,
				number: 0,
				sort: {},
				first: false,
				last: false,
				numberOfElements: 0,
				empty: false,
				totalElements: 0,
				totalPages: 0,
			}
	);
};
