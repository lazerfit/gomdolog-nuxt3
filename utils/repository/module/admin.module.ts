import type { ISigninForm } from '~/stores/header';
import FetchFactory from '../factory';
import Routes from '~/server/routes.client';
import type { IPostTopAdmin, IToken } from '~/types/model/admin';
import type { IPostDeleted } from '~/types/model/post';

class AdminModule extends FetchFactory {
	private readonly RESOURCE = Routes.Admin;
	private token = useSessionStorage('token', '');

	async signin(dto: ISigninForm) {
		return this.call<IToken>({
			method: 'POST',
			url: `${this.RESOURCE.signin()}`,
			body: dto,
		});
	}

	async fetchTop() {
		return this.call<IPostTopAdmin[]>({
			method: 'GET',
			url: `${this.RESOURCE.fetchTop()}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
				params: {
					limit: 5,
				},
			},
		});
	}

	async fetchDeletedPosts() {
		return this.call<IPostDeleted[]>({
			method: 'GET',
			url: `${this.RESOURCE.fetchDeletedPost()}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
		});
	}

	async revertPost(id: number) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.revertPost(id)}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
		});
	}

	async deletePostPermanent(id: number) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.deletePost(id)}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
		});
	}
}

export default AdminModule;
