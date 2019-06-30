import { RootAction, RootState } from "MyTypes";
import { Epic } from "redux-observable";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

import { authConstants, authActions } from "../auth";
import { apiPath, defaultHeaders, tokenHeaders } from "../../api";

const {
  registerSucces,
  registerFailed,
  userLoaded,
  authError,
  loginSucces,
  loginFailed
} = authActions;

export const load: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(authConstants.USER_LOADING)),
    switchMap(() =>
      ajax.get(apiPath + "auth/user", tokenHeaders(state$.value)).pipe(
        map(({ response }) => userLoaded(response)),
        catchError(() => of(authError()))
      )
    )
  );

export const register: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(authConstants.REGISTER)),
    switchMap(action =>
      ajax.post(apiPath + "users", action.payload, defaultHeaders).pipe(
        map(({ response }) => registerSucces(response.user, response.token)),
        catchError(({ response }) => of(registerFailed(response)))
      )
    )
  );

export const login: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(authConstants.LOGIN)),
    switchMap(action =>
      ajax.post(apiPath + "auth", action.payload, defaultHeaders).pipe(
        map(({ response }) => loginSucces(response.user, response.token)),
        catchError(({ response }) => of(loginFailed(response)))
      )
    )
  );
