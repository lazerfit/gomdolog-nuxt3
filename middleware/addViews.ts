export default defineNuxtRouteMiddleware(async (to) => {
	if (import.meta.client) {
		const headerStore = useHeaderStore();
		const { addViews } = usePostStore();

		const isVisitedPost = () => {
			const visitedPost = localStorage.getItem('visitedPost');
			return visitedPost ? visitedPost.includes(to.params.id) : false;
		};

		if (!isVisitedPost() && !headerStore.isAdmin) {
			await addViews(to.params.id);
			const visitedPostString = localStorage.getItem('visitedPost') || '[]';
			const visitedPost = JSON.parse(visitedPostString);
			visitedPost.push(to.params.id);
			localStorage.setItem('visitedPost', JSON.stringify(visitedPost));
		}
	}

	navigateTo(to.fullPath);
});
