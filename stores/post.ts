import { defineStore, acceptHMRUpdate } from 'pinia';
import type {
	PostPageResponseWithoutTags,
	PostSave,
	PostDeleted,
} from '~/types';

export const usePostStore = defineStore('post', () => {
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

	const pageSize = ref(6);

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
		tags: [''],
		summary: '',
	});

	const postsDeleted = ref<PostDeleted[]>([]);

	const formatDate = (date: string) => {
		const formattedDate = new Date(date);
		const year = formattedDate.getFullYear();
		const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
		const day = String(formattedDate.getDate()).padStart(2, '0');
		return `${year}년 ${month}월 ${day}일`;
	};

	return { postsPage, pageSize, formatDate, postSaveForm, postsDeleted, post };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
