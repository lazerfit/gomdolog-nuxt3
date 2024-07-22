export interface ICategory {
	id: number;
	title: string;
}

export interface ICategoryAdmin extends ICategory {
	isEditable: boolean;
}
