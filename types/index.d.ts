export interface Post {
	id: number;
	title: string;
	content: string;
	createdDate: string;
	thumbnail: string;
	categoryTitle: string;
	tags: string[];
	updatedDate: string;
}

export interface PostDetail {
	id: number;
	title: string;
	content: string;
	createdDate: string;
	tags: string[];
	summary: string;
}

export interface PostPageResponseWithoutTags {
	content: PostResopnseWithoutTags[];
	numberOfElements: number;
	size: number;
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	number: number;
}

export interface PostSliceResponseWithoutTags {
	content: PostResopnseWithoutTags[];
	first: boolean;
	last: boolean;
	nubmer: number;
}

export interface PageInfo {
	totalElements: number;
	totalPages: number;
	number: number;
	first: boolean;
	last: boolean;
	limit: number;
}

export interface Category {
	id: number;
	title: string;
	isEditable?: boolean;
}

export interface PostResopnseWithoutTags {
	id: number;
	title: string;
	content: string;
	createdDate: string;
	thumbnail: string;
	categoryTitle: string;
}

export interface JWT {
	token: string;
	role: string;
}

export interface PostSave {
	title: string;
	content: string;
	categoryTitle: string;
	tags: string[];
}

export interface PostUpdate {
	title: string;
	content: string;
	categoryTitle: string;
	tags: string[];
	id: string | string[];
}

export interface AdminPopularPosts {
	title: string;
	views: number;
}

export interface PostDeleted {
	id: number;
	title: string;
	deletedDate: string;
}

export interface UserRole {
	role: string;
}

export interface ErrorResponse {
	timestamp: string;
	status: number;
	error: string;
	message: string;
	path: string;
}
