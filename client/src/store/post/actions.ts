import { action } from "typesafe-actions";

import { deepCopy } from "../../utils";
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  ADD_POST,
  ADD_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAILED,
  ADD_POST_FAILED,
  UPDATE_POST_FAILED,
  DELETE_POST_FAILED
} from "./constants";
import { PostsById, Post, AddPostData } from "./models";
import { Comment } from "../comment/models";
import { UpdateOpinionData } from "../models";

export const fetchPosts = () => action(FETCH_POSTS);
export const fetchPostsFailed = () => action(FETCH_POSTS_FAILED);
export const fetchPostsSuccess = (
  oldPosts: PostsById,
  oldIds: string[],
  fetchedPosts: Post[],
  fetchedComments: Comment[],
  hasMorePosts: boolean
) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  const newIds: string[] = [...oldIds];
  fetchedPosts.forEach(({ _id, ...rest }) => {
    newPosts[_id] = { _id, ...rest };
    if (newIds.indexOf(_id) === -1) newIds.push(_id);
  });
  const payload = {
    newById: newPosts,
    ids: newIds,
    fetchedComments: fetchedComments,
    canFetchMore: hasMorePosts
  };
  return action(FETCH_POSTS_SUCCESS, payload);
};

export const addPost = (data: AddPostData) => action(ADD_POST, data);
export const addPostFailed = () => action(ADD_POST_FAILED);
export const addPostSuccess = (oldPosts: PostsById, { _id, ...rest }: Post) => {
  return action(ADD_POST_FAILED);
  const newPosts: PostsById = deepCopy(oldPosts);
  newPosts[_id] = { ...rest, _id };
  const payload = { newById: newPosts, id: _id };
  return action(ADD_POST_SUCCESS, payload);
};

export const addPostSocket = (oldPosts: PostsById, { _id, ...rest }: Post) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  newPosts[_id] = { ...rest, _id };
  const payload = { newById: newPosts, id: _id };
  return action(ADD_POST_SUCCESS, payload);
};

export const updatePost = (id: string, data: UpdateOpinionData) =>
  action(UPDATE_POST, { id, data });
export const updatePostFailed = () => action(UPDATE_POST_FAILED);
export const updatePostSuccess = (oldPosts: PostsById, updatedPost: Post) => {
  return action(UPDATE_POST_FAILED)
  const newPosts: PostsById = deepCopy(oldPosts);
  newPosts[updatedPost._id] = { ...newPosts[updatedPost._id], ...updatedPost };
  const payload = { newById: newPosts };
  return action(UPDATE_POST_SUCCESS, payload);
};

export const updatePostSocket = (oldPosts: PostsById, updatedPost: Post) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  newPosts[updatedPost._id] = { ...newPosts[updatedPost._id], ...updatedPost };
  const payload = { newById: newPosts };
  return action(UPDATE_POST_SUCCESS, payload);
};

export const deletePost = (id: string) => action(DELETE_POST, id);
export const deletePostFailed = () => action(DELETE_POST_FAILED);
export const deletePostSuccess = (oldPosts: PostsById, id: string) => {
  return action(DELETE_POST_FAILED);
  const newPosts: PostsById = deepCopy(oldPosts);
  delete newPosts[id];
  const payload = { newById: newPosts, id };
  return action(DELETE_POST_SUCCESS, payload);
};

export const deletePostSocket = (oldPosts: PostsById, id: string) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  delete newPosts[id];
  const payload = { newById: newPosts, id };
  return action(DELETE_POST_SUCCESS, payload);
};