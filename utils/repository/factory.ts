import type { $Fetch, NitroFetchOptions } from 'nitropack';

interface IFetchFactory {
	method:
		| 'GET'
		| 'HEAD'
		| 'PATCH'
		| 'POST'
		| 'PUT'
		| 'DELETE'
		| 'CONNECT'
		| 'OPTIONS'
		| 'TRACE'
		| 'get'
		| 'head'
		| 'patch'
		| 'post'
		| 'put'
		| 'delete'
		| 'connect'
		| 'options'
		| 'trace';
	url: string;
	fetchOptions?: NitroFetchOptions<'json'>;
	body?: object;
}

class FetchFactory {
	private readonly $fetch: $Fetch;

	constructor(fetcher: $Fetch) {
		this.$fetch = fetcher;
	}

	async call<T>({
		method,
		url,
		fetchOptions,
		body,
	}: IFetchFactory): Promise<T> {
		return this.$fetch<T>(url, {
			method,
			body: body,
			headers: {
				'Content-Type': 'application/json',
			},
			...fetchOptions,
		});
	}
}

export default FetchFactory;
