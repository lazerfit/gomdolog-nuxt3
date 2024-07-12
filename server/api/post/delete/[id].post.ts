export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const id = getRouterParam(event, 'id');
	const contentType = getHeader(event, 'Content-Type') || 'application/json';
	const authorization = getHeader(event, 'Authorization') || '';

	await $fetch(`${config.public.apiBase}/post/delete/${id}`, {
		method: 'POST',
		headers: {
			Authorization: authorization,
			'Content-Type': contentType,
		},
	});
});
