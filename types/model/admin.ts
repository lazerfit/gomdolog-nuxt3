export interface ISigninForm {
	email: string;
	password: string;
}

export interface IToken {
	token: string;
	role: string;
}

export interface IPostTopAdmin {
	title: string;
	views: number;
}

export interface IPostDeleted {
	id: number;
	title: string;
	deletedDate: string;
}
