import { action } from "typesafe-actions";

import { deepCopy } from "../../utils";
import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  FETCH_COMMENTS_FAILED,
  ADD_COMMENT_FAILED,
  UPDATE_COMMENT_FAILED,
  DELETE_COMMENT_FAILED,
  SET_COMMENTS_COUNT,
  OPEN_REPLYING,
  CLOSE_REPLYING
} from "./constants";
import { CommentsById, Comment, AddCommentData } from "./models";
import { UpdateOpinionData } from "../models";

export const fetchComments = () => action(FETCH_COMMENTS);
export const fetchCommentsFailed = () => action(FETCH_COMMENTS_FAILED);
export const fetchCommentsSuccess = (
  oldComments: CommentsById,
  fetchedComments: Comment[]
) => {
  const newComments: CommentsById = deepCopy(oldComments);
  const ids: string[] = [];
  fetchedComments.forEach(({ _id, ...rest }) => {
    newComments[_id] = { _id, ...rest };
    ids.push(_id);
  });
  const payload = { newById: newComments, ids };
  return action(FETCH_COMMENTS_SUCCESS, payload);
};

export const addComment = (data: AddCommentData) => action(ADD_COMMENT, data);
export const addCommentFailed = () => action(ADD_COMMENT_FAILED);
export const addCommentSuccess = (
  oldComments: CommentsById,
  { _id, ...rest }: Comment
) => {
  const newComments: CommentsById = deepCopy(oldComments);
  newComments[_id] = { ...rest, _id };
  const payload = { newById: newComments, id: _id };
  return action(ADD_COMMENT_SUCCESS, payload);
};

export const updateComment = (id: string, data: UpdateOpinionData) =>
  action(UPDATE_COMMENT, { id, data });
export const updateCommentFailed = () => action(UPDATE_COMMENT_FAILED);
export const updateCommentSuccess = (
  oldComments: CommentsById,
  updatedComment: Comment
) => {
  const newComments: CommentsById = deepCopy(oldComments);
  newComments[updatedComment._id] = updatedComment;
  const payload = { newById: newComments };
  return action(UPDATE_COMMENT_SUCCESS, payload);
};

export const deleteComment = (id: string) => action(DELETE_COMMENT, id);
export const deleteCommentFailed = () => action(DELETE_COMMENT_FAILED);
export const deleteCommentSuccess = (oldComments: CommentsById, id: string) => {
  const newComments: CommentsById = deepCopy(oldComments);
  delete newComments[id];
  const payload = { newById: newComments, id };
  return action(DELETE_COMMENT_SUCCESS, payload);
};

export const setCommentCount = (id: string, count: number) =>
  action(SET_COMMENTS_COUNT, { id, count });

export const openReplying = (id: string) => action(OPEN_REPLYING, id);
export const closeReplying = (id: string) => action(CLOSE_REPLYING, id);
