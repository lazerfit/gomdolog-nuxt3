export default defineNuxtRouteMiddleware(async (to) => {
	const headerStore = useHeaderStore();

	if (headerStore.isAdmin) {
		navigateTo(to.fullPath);
	} else {
		abortNavigation('post not found');
	}
});
