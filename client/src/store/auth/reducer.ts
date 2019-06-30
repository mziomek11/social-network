import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./constants";
import { User } from "./models";
import * as actions from "./actions";

export type AuthAction = ActionType<typeof actions>;
export type AuthState = Readonly<{
  user: null | User;
  status: {
    isInitCheckDone: boolean;
    token: string | null;
    isAuthenticated: boolean;
    isInitChecking: boolean;
    isRegisterLoading: boolean;
    isLoginLoading: boolean;
    isRegisterSuccess: boolean;
  };
  errors: {
    register: {
      [key: string]: string;
    };
    login: {
      [key: string]: string;
    };
  };
}>;

const initState: AuthState = {
  user: null,
  status: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isInitChecking: false,
    isRegisterLoading: false,
    isLoginLoading: false,
    isInitCheckDone: false,
    isRegisterSuccess: false
  },
  errors: {
    register: {},
    login: {}
  }
};

export default combineReducers<AuthState, AuthAction>({
  status: (state = initState.status, action) => {
    switch (action.type) {
      case USER_LOADING:
        return { ...state, isInitChecking: true };
      case REGISTER:
        return { ...state, isRegisterLoading: true, isRegisterSuccess: false };
      case LOGIN:
        return { ...state, isLoginLoading: true, isRegisterLoading: false };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isInitChecking: false,
          isInitCheckDone: true
        };
      case LOGIN_SUCCESS:
        console.log("LOGGGEN IN");
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          isInitChecking: false,
          isRegisterLoading: false,
          isLoginLoading: false
        };
      case REGISTER_SUCCESS:
        console.log("REGISTERED");
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          isInitChecking: false,
          isRegisterLoading: false,
          isLoginLoading: false,
          isRegisterSuccess: true
        };
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGOUT_SUCCESS:
        localStorage.removeItem("token");
        return { ...initState.status, isInitCheckDone: true };
      default:
        return state;
    }
  },
  user: (state = initState.user, action) => {
    switch (action.type) {
      case USER_LOADED:
        return action.payload;
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return action.payload.user;
      case AUTH_ERROR:
      case LOGOUT_SUCCESS:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
        return initState.user;
      default:
        return state;
    }
  },
  errors: (state = initState.errors, action) => {
    switch (action.type) {
      case LOGIN_FAIL:
        console.log(action.payload);
        return { ...state, login: { ...action.payload } };
      case REGISTER_FAIL:
        console.log(action.payload);
        return { ...state, register: { ...action.payload } };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return { login: {}, register: {} };
      default:
        return state;
    }
  }
});
