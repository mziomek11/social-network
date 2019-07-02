import { RootAction, RootState } from "MyTypes";
import { Epic } from "redux-observable";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

import { subCommentConstants, subCommentActions } from "../subComment";
import { apiPath, tokenHeaders } from "../../api";
const {
  fetchSubCommentsSuccess,
  fetchSubCommentsFailed,
  addSubCommentSuccess,
  addSubCommentFailed,
  deleteSubCommentSuccess,
  deleteSubCommentFailed,
  updateSubCommentSuccess,
  updateSubCommentFailed
} = subCommentActions;

export const fetchSubComments: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(subCommentConstants.FETCH_SUBCOMMENTS)),
    switchMap(() =>
      ajax.get(`${apiPath}subcomments/`, tokenHeaders(state$.value)).pipe(
        map(({ response }) =>
          fetchSubCommentsSuccess(state$.value.subComment.byId, response)
        ),
        catchError(() => of(fetchSubCommentsFailed()))
      )
    )
  );

export const addSubComment: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(subCommentConstants.ADD_SUBCOMMENT)),
    switchMap(({ payload }) =>
      ajax
        .post(
          `${apiPath}subcomments/${payload.commentId}`,
          { content: payload.content },
          tokenHeaders(state$.value)
        )
        .pipe(
          map(({ response }) =>
            addSubCommentSuccess(state$.value.subComment.byId, response)
          ),
          catchError(() => of(addSubCommentFailed()))
        )
    )
  );

export const deleteSubComment: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(subCommentConstants.DELETE_SUBCOMMENT)),
    switchMap(({ payload }) =>
      ajax
        .delete(`${apiPath}subcomments/${payload}`, tokenHeaders(state$.value))
        .pipe(
          map(() =>
            deleteSubCommentSuccess(state$.value.subComment.byId, payload)
          ),
          catchError(() => of(deleteSubCommentFailed()))
        )
    )
  );

export const update: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(subCommentConstants.UPDATE_SUBCOMMENT)),
    switchMap(({ payload }) =>
      ajax
        .put(
          `${apiPath}subcomments/${payload.id}`,
          payload.data,
          tokenHeaders(state$.value)
        )
        .pipe(
          map(({ response }) =>
            updateSubCommentSuccess(state$.value.subComment.byId, response)
          ),
          catchError(() => of(updateSubCommentFailed()))
        )
    )
  );
