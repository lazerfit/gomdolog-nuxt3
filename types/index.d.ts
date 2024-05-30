export interface Post {
  id: number,
  title: string,
  content: string,
  createdDate: string,
  thumbnail: string;
  categoryTitle: string,
  tags: string[]
  updatedDate: string
}

export interface PostPageResponseWithoutTags {
  content: PostResopnseWithoutTags[];
  numberOfElements: number;
  size: number;
}

export interface Category {
  id: number,
  title: string
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
  token: string
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

export interface CategoryResponse {
  id: number;
  title: string;
  isEditable: boolean;
}

export interface AdminPopularPosts {
  title: string,
  views: number
}

export interface PostDeleted {
  id:number,
  title: string,
  deletedDate: string
}

