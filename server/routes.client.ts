const prefix: string = '/api';

const Routes = {
	Post: {
		fetchAll: () => `${prefix}/post/all`,
		fetchAllSlice: () => `${prefix}/post/all/slice`,
		fetchDetail: (id: number) => `${prefix}/post/${id}`,
		fetchByTitle: () => `${prefix}/post/search`,
		fetchByTitleSlice: () => `${prefix}/post/search/slice`,
		fetchByCategory: () => `${prefix}/post/category`,
		fetchByCategorySlice: () => `${prefix}/post/category/slice`,
		fetchTop: () => `${prefix}/post/popular`,
		fetchUpdateForm: (id: number) => `${prefix}/post/update/form/${id}`,
		save: () => `${prefix}/post/new`,
		update: (id: number) => `${prefix}/post/update/${id}`,
		delete: (id: number) => `${prefix}/post/delete/${id}`,
		deletePermanent: (id: number) => `${prefix}/post/deletePermanent/${id}`,
		deleteRevert: (id: number) => `${prefix}/post/revertDelete/${id}`,
		addViews: (id: number) => `${prefix}/post/${id}/views`,
	},
	Category: {
		fetchAll: () => `${prefix}/category/all`,
		save: () => `${prefix}/category/new`,
		delete: (id: number) => `${prefix}/category/delete/${id}`,
		update: (id: number) => `${prefix}/category/update/${id}`,
	},
	Admin: {
		signin: () => `${prefix}/auth/signin`,
		fetchTop: () => `${prefix}/post/popular/top5`,
		fetchDeletedPost: () => `${prefix}/post/recycling`,
		revertPost: (id: number) => `${prefix}/post/revertDelete/${id}`,
		deletePost: (id: number) => `${prefix}/post/deletePermanent/${id}`,
	},
};

export default Routes;
