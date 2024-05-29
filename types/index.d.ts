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