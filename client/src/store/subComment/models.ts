import { Opinion, AddOpinionData } from "../models";

export interface SubComment extends Opinion {
  post: string;
  comment: string;
}

export type SubCommentsById = {
  [id: string]: SubComment;
};

export interface AddSubCommentData extends AddOpinionData {
  commentId: string;
}
