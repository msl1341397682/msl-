export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  author: User;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  postId: string;
}