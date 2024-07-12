export default defineNuxtRouteMiddleware(async (to) => {
	const headerStore = useHeaderStore();

	if (headerStore.isAdmin) {
		navigateTo(to.fullPath);
	} else {
		showError({ status: 404, message: 'Page Not Found' });
	}
});
