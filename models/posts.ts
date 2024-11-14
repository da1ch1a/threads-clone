export type Post = {
  id: number;
  userId: string;
  name: string;
  image: string;
  text: string;
  picture: string;
  likes: Like[];
};

export type Like = {
  id: number;
  userId: string;
  postId: number;
};
