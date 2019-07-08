import { action } from "typesafe-actions";

import { deepCopy } from "../../utils";
import {
  FETCH_SUBCOMMENTS,
  FETCH_SUBCOMMENTS_SUCCESS,
  ADD_SUBCOMMENT,
  ADD_SUBCOMMENT_SUCCESS,
  UPDATE_SUBCOMMENT,
  UPDATE_SUBCOMMENT_SUCCESS,
  DELETE_SUBCOMMENT,
  DELETE_SUBCOMMENT_SUCCESS,
  FETCH_SUBCOMMENTS_FAILED,
  ADD_SUBCOMMENT_FAILED,
  UPDATE_SUBCOMMENT_FAILED,
  DELETE_SUBCOMMENT_FAILED,
  SET_SUBCOMMENTS_COUNT
} from "./constants";
import { SubCommentsById, SubComment, AddSubCommentData } from "./models";
import { UpdateOpinionData } from "../models";

export const fetchSubComments = (commentId: string, subCommentsCount: number) =>
  action(FETCH_SUBCOMMENTS, { commentId, subCommentsCount });
export const fetchSubCommentsFailed = () => action(FETCH_SUBCOMMENTS_FAILED);
export const fetchSubCommentsSuccess = (
  oldSubComments: SubCommentsById,
  fetchedSubComments: SubComment[]
) => {
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  const ids: string[] = [];
  fetchedSubComments.forEach(({ _id, ...rest }) => {
    newSubComments[_id] = { _id, ...rest };
    ids.push(_id);
  });
  const payload = { newById: newSubComments, ids };
  return action(FETCH_SUBCOMMENTS_SUCCESS, payload);
};

export const addSubComment = (data: AddSubCommentData) =>
  action(ADD_SUBCOMMENT, data);
export const addSubCommentFailed = () => action(ADD_SUBCOMMENT_FAILED);
export const addSubCommentSuccess = (
  oldSubComments: SubCommentsById,
  { _id, ...rest }: SubComment
) => {
  return action(ADD_SUBCOMMENT_FAILED);
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  newSubComments[_id] = { ...rest, _id };
  const payload = { newById: newSubComments, id: _id };
  return action(ADD_SUBCOMMENT_SUCCESS, payload);
};

export const addSubCommentSocket = (
  oldSubComments: SubCommentsById,
  { _id, ...rest }: SubComment
) => {
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  newSubComments[_id] = { ...rest, _id };
  const payload = { newById: newSubComments, id: _id };
  return action(ADD_SUBCOMMENT_SUCCESS, payload);
};

export const updateSubComment = (id: string, data: UpdateOpinionData) =>
  action(UPDATE_SUBCOMMENT, { id, data });
export const updateSubCommentFailed = () => action(UPDATE_SUBCOMMENT_FAILED);
export const updateSubCommentSuccess = (
  oldSubComments: SubCommentsById,
  updatedSubComment: SubComment
) => {
  return action(UPDATE_SUBCOMMENT_FAILED);
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  newSubComments[updatedSubComment._id] = {
    ...newSubComments[updatedSubComment._id],
    ...updatedSubComment
  };
  const payload = { newById: newSubComments };
  return action(UPDATE_SUBCOMMENT_SUCCESS, payload);
};

export const updateSubCommentSocket = (
  oldSubComments: SubCommentsById,
  updatedSubComment: SubComment
) => {
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  newSubComments[updatedSubComment._id] = {
    ...newSubComments[updatedSubComment._id],
    ...updatedSubComment
  };
  const payload = { newById: newSubComments };
  return action(UPDATE_SUBCOMMENT_SUCCESS, payload);
};

export const deleteSubComment = (id: string) => action(DELETE_SUBCOMMENT, id);
export const deleteSubCommentFailed = () => action(DELETE_SUBCOMMENT_FAILED);
export const deleteSubCommentSuccess = (
  oldSubComments: SubCommentsById,
  id: string
) => {
  return action(DELETE_SUBCOMMENT_FAILED);
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  delete newSubComments[id];
  const payload = { newById: newSubComments, id };
  return action(DELETE_SUBCOMMENT_SUCCESS, payload);
};

export const deleteSubCommentSocket = (
  oldSubComments: SubCommentsById,
  id: string
) => {
  const newSubComments: SubCommentsById = deepCopy(oldSubComments);
  delete newSubComments[id];
  const payload = { newById: newSubComments, id };
  return action(DELETE_SUBCOMMENT_SUCCESS, payload);
};

export const setFetchedSubCommentCount = (id: string, count: number) =>
  action(SET_SUBCOMMENTS_COUNT, { id, count });
