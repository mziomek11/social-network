import { Opinion, AddOpinionData } from "../models";

export interface Post extends Opinion {
  image: string | null;
}

export type PostsById = {
  [id: string]: Post;
};

export interface AddPostData extends AddOpinionData {}
