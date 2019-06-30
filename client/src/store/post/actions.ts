import { action } from "typesafe-actions";

import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  ADD_POST,
  ADD_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAILED,
  GET_POST_FAILED,
  ADD_POST_FAILED,
  UPDATE_POST_FAILED,
  DELETE_POST_FAILED
} from "./constants";
import { PostsById, Post, AddPostData } from "./models";

export const fetchPosts = () => action(FETCH_POSTS);
export const fetchPostsFailed = () => action(FETCH_POSTS_FAILED);
export const fetchPostsSuccess = (fetchedPosts: Post[]) => {
  const newPosts: PostsById = {};
  const ids: string[] = [];
  fetchedPosts.forEach(({ _id, ...rest }) => {
    newPosts[_id] = { _id, ...rest, comments: [] };
    ids.push(_id);
  });
  const payload = { newById: newPosts, ids };
  return action(FETCH_POSTS_SUCCESS, payload);
};

export const getPost = (id: string) => action(GET_POST, id);
export const getPostFailed = () => action(GET_POST_FAILED);
export const getPostSuccess = (post: Post) => {
  const newPosts: PostsById = {};
  newPosts[post._id] = post;
  const payload = { newById: newPosts, id: post._id };
  return action(GET_POST_SUCCESS, payload);
};

export const addPost = (data: AddPostData) => action(ADD_POST, data);
export const addPostFailed = () => action(ADD_POST_FAILED);
export const addPostSuccess = (oldPosts: PostsById, { _id, ...rest }: Post) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  newPosts[_id] = { ...rest, _id };
  const payload = { newById: newPosts, id: _id };
  return action(ADD_POST_SUCCESS, payload);
};

export const updatePost = (id: string, data: AddPostData) =>
  action(UPDATE_POST, { id, data });
export const updatePostFailed = () => action(UPDATE_POST_FAILED);
export const updatePostSuccess = (updatedPost: Post) => {
  console.log(updatedPost)
  const newPosts: PostsById = {};
  newPosts[updatedPost._id] = updatedPost;
  const payload = { newById: newPosts, id: updatedPost._id };
  return action(UPDATE_POST_SUCCESS, payload);
};

export const deletePost = (id: string) => action(DELETE_POST, id);
export const deletePostFailed = () => action(DELETE_POST_FAILED);
export const deletePostSuccess = (oldPosts: PostsById, id: string) => {
  const newPosts: PostsById = deepCopy(oldPosts);
  delete newPosts[id];
  const payload = { newById: newPosts, id };
  return action(DELETE_POST_SUCCESS, payload);
};

const deepCopy = (o: Object) => JSON.parse(JSON.stringify(o));
