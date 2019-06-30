interface Opinion {
  _id: string;
  owner: string;
  authorName: string;
  content: string | null;
  date: Date;
  likedBy: string[];
}

export interface Post extends Opinion {
  image: string | null;
  comments: Comment[];
}

interface Comment extends Opinion {
  commentAnswers: Comment[];
}

export type PostsById = {
  [id: string]: Post;
};

export type AddPostData = {
  content: string;
  image?: string;
};
