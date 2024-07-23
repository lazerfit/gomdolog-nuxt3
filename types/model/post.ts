interface Post {
	id: number;
	title: string;
	content: string;
	createdDate: string;
}

export interface IPost extends Post {
	thumbnail: string;
	categoryTitle: string;
}

export interface IPostDetail extends Post {
	tags: string[];
	summary: string;
	updatedDate: string;
}

export interface IPostPage {
	content: IPost[];
	pageable: object;
	size: number;
	number: number;
	sort: object;
	first: boolean;
	last: boolean;
	numberOfElements: number;
	empty: boolean;
	totalElements: number;
	totalPages: number;
}

export interface IPostSaveForm {
	title: string;
	content: string;
	categoryTitle: string;
	tags: string[];
}

export interface IPostDeleted {
	id: number;
	title: string;
	deletedDate: string;
}
