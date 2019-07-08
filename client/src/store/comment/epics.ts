import { RootAction, RootState } from "MyTypes";
import { Epic } from "redux-observable";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

import { commentConstants, commentActions } from "../comment";
import { apiPath, tokenHeaders } from "../../api";
const {
  fetchCommentsSuccess,
  fetchCommentsFailed,
  addCommentSuccess,
  addCommentFailed,
  deleteCommentSuccess,
  deleteCommentFailed,
  updateCommentSuccess,
  updateCommentFailed
} = commentActions;

export const fetchComments: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(commentConstants.FETCH_COMMENTS)),
    switchMap(({ payload }) => {
      const path = `${apiPath}comments?post=${payload.postId}&count=${
        payload.commentsCount
      }/`;
      
      return ajax.get(path, tokenHeaders(state$.value)).pipe(
        map(({ response }) =>
          fetchCommentsSuccess(state$.value.comment.byId, response)
        ),
        catchError(() => of(fetchCommentsFailed()))
      );
    })
  );

export const addComment: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(commentConstants.ADD_COMMENT)),
    switchMap(({ payload }) =>
      ajax
        .post(
          `${apiPath}comments/${payload.postId}`,
          { content: payload.content },
          tokenHeaders(state$.value)
        )
        .pipe(
          map(({ response }) =>
            addCommentSuccess(state$.value.comment.byId, response)
          ),
          catchError(() => of(addCommentFailed()))
        )
    )
  );

export const deleteComment: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(commentConstants.DELETE_COMMENT)),
    switchMap(({ payload }) =>
      ajax
        .delete(`${apiPath}comments/${payload}`, tokenHeaders(state$.value))
        .pipe(
          map(() => deleteCommentSuccess(state$.value.comment.byId, payload)),
          catchError(() => of(deleteCommentFailed()))
        )
    )
  );

export const update: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(commentConstants.UPDATE_COMMENT)),
    switchMap(({ payload }) =>
      ajax
        .put(
          `${apiPath}comments/${payload.id}`,
          payload.data,
          tokenHeaders(state$.value)
        )
        .pipe(
          map(({ response }) =>
            updateCommentSuccess(state$.value.comment.byId, response)
          ),
          catchError(() => of(updateCommentFailed()))
        )
    )
  );
