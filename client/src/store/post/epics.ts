import { RootAction, RootState } from "MyTypes";
import { Epic } from "redux-observable";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

import { postConstants, postActions } from "../post";
import { apiPath, tokenHeaders } from "../../api";
const {
  fetchPostsSuccess,
  fetchPostsFailed,
  getPostSuccess,
  getPostFailed,
  addPostSuccess,
  addPostFailed,
  deletePostSuccess,
  deletePostFailed,
  updatePostSuccess,
  updatePostFailed
} = postActions;

export const fetchPosts: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(postConstants.FETCH_POSTS)),
    switchMap(() =>
      ajax.get(apiPath + "posts/", tokenHeaders(state$.value)).pipe(
        map(({ response }) => fetchPostsSuccess(response)),
        catchError(() => of(fetchPostsFailed()))
      )
    )
  );

export const getPost: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(postConstants.GET_POST)),
    switchMap(({ payload }) =>
      ajax.get(`${apiPath}posts/${payload}`, tokenHeaders(state$.value)).pipe(
        map(({ response }) => getPostSuccess(response)),
        catchError(() => of(getPostFailed()))
      )
    )
  );

export const addPost: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(postConstants.ADD_POST)),
    switchMap(({ payload }) =>
      ajax.post(apiPath + "posts/", payload, tokenHeaders(state$.value)).pipe(
        map(({ response }) => addPostSuccess(state$.value.post.byId, response)),
        catchError(() => of(addPostFailed()))
      )
    )
  );

export const deletePost: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(postConstants.DELETE_POST)),
    switchMap(({ payload }) =>
      ajax
        .delete(`${apiPath}posts/${payload}`, tokenHeaders(state$.value))
        .pipe(
          map(() => deletePostSuccess(state$.value.post.byId, payload)),
          catchError(() => of(deletePostFailed()))
        )
    )
  );

export const update: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(postConstants.UPDATE_POST)),
    switchMap(({ payload }) =>
      ajax
        .put(
          `${apiPath}posts/${payload.id}`,
          payload.data,
          tokenHeaders(state$.value)
        )
        .pipe(
          map(({ response }) => updatePostSuccess(response)),
          catchError(() => of(updatePostFailed()))
        )
    )
  );
