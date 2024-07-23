import FetchFactory from '../factory';
import Routes from '~/server/routes.client';
import type { ICategory } from '~/types/model/category';

class CategoryModule extends FetchFactory {
	private readonly RESOURCE = Routes.Category;
	private token = useSessionStorage('token', '');

	async fetchAll() {
		return this.call<ICategory[]>({
			method: 'GET',
			url: `${this.RESOURCE.fetchAll()}`,
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

	async save(data: string) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.save()}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
			body: {
				title: data,
			},
		});
	}

	async update(id: number, title: string) {
		return this.call({
			method: 'POST',
			url: `${this.RESOURCE.update(id)}`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${this.token.value}`,
				},
			},
			body: {
				id: id,
				title: title,
			},
		});
	}
}

export default CategoryModule;
