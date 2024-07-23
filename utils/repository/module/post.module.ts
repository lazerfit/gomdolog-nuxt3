import FetchFactory from '../factory';
import Routes from '~/server/routes.client';
import type {
	IPostDetail,
	IPostPage,
	IPostSaveForm,
	IPost,
} from '~/types/model/post';

class PostModule extends FetchFactory {
	private readonly RESOURCE = Routes.Post;
	private token = useSessionStorage('token', '');

	async fetchAll(pageNum: number) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchAll()}`,
			fetchOptions: {
				params: {
					page: pageNum,
					size: 6,
				},
			},
		});
	}

	async fetchAllSlice(pageNum: number) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchAllSlice()}`,
			fetchOptions: {
				params: {
					page: pageNum,
					size: 9,
				},
			},
		});
	}

	async fetchAllByCategory(title: string, page: string) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchByCategory()}`,
			fetchOptions: {
				params: {
					title: title,
					page: page,
					size: 9,
				},
			},
		});
	}

	async fetchAllByCategorySlice(title: string, page: number) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchByCategorySlice()}`,
			fetchOptions: {
				params: {
					title: title,
					page: page,
					size: 9,
				},
			},
		});
	}

	async fetchAllByTitle(title: string, page: string) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchByTitle()}`,
			fetchOptions: {
				params: {
					title: title,
					page: page,
					size: 9,
				},
			},
		});
	}

	async fetchAllByTitleSlice(title: string, page: number) {
		return this.call<IPostPage>({
			method: 'GET',
			url: `${this.RESOURCE.fetchByTitleSlice()}`,
			fetchOptions: {
				params: {
					title: title,
					page: page,
					size: 9,
				},
			},
		});
	}

	async fetchDetail(id: number) {
		return this.call<IPostDetail>({
			method: 'GET',
			url: `${this.RESOURCE.fetchDetail(id)}`,
		});
	}

	async fetchUpdateForm(id: number) {
		return this.call<IPostSaveForm>({
			method: 'GET',
			url: `${this.RESOURCE.fetchUpdateForm(id)}`,
		});
	}

	async delete(id: number) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.delete(id)}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
		});
	}

	async save(body: IPostSaveForm) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.save()}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
				body: body,
			},
		});
	}

	async update(id: number, body: IPostSaveForm) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.update(id)}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
				body: body,
			},
		});
	}

	async addViews(id: number) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.addViews(id)}`,
		});
	}

	async fetchTop() {
		return this.call<IPost[]>({
			method: 'GET',
			url: `${this.RESOURCE.fetchTop()}`,
			fetchOptions: {
				params: {
					limit: 3,
				},
			},
		});
	}
}

export default PostModule;
