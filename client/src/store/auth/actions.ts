import { action } from "typesafe-actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER
} from "./constants";
import { User, Register, RegisterErrors, LoginErrors, Login } from "./models";

export const loadUser = () => action(USER_LOADING);
export const userLoaded = (user: User) => action(USER_LOADED, user);
export const authError = () => action(AUTH_ERROR);

export const register = (data: Register) => action(REGISTER, data);
export const registerFailed = (errs: RegisterErrors) =>
  action(REGISTER_FAIL, errs);
export const registerSucces = (user: User, token: string) =>
  action(REGISTER_SUCCESS, { user, token });

export const login = (data: Login) => action(LOGIN, data);
export const loginFailed = (errs: LoginErrors) => action(LOGIN_FAIL, errs);
export const loginSucces = (user: User, token: string) =>
  action(LOGIN_SUCCESS, { user, token });

export const logout = () => action(LOGOUT_SUCCESS);
