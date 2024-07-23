import { joinURL } from 'ufo';
import { Routes } from '../routes.server';

export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.apiBase;

	let path = '';
	let target = '';

	if (event.path.startsWith(Routes.core.name)) {
		path = event.path.replace(Routes.core.name, '');
		target = joinURL(url, path);
	}

	return proxyRequest(event, target);
});
