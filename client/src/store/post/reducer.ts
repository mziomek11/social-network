import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILED,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED
} from "./constants";
import { PostsById } from "./models";
import * as actions from "./actions";

type PostAction = ActionType<typeof actions>;
type PostState = Readonly<{
  byId: PostsById;
  allIds: string[];
  status: {
    fetchingPosts: boolean;
    gettingPost: boolean;
    deletingPost: boolean;
    addingPost: boolean;
    updatingPost: boolean;
  };
}>;

const initState: PostState = {
  byId: {},
  allIds: [],
  status: {
    fetchingPosts: false,
    gettingPost: false,
    deletingPost: false,
    addingPost: false,
    updatingPost: false
  }
};

export default combineReducers<PostState, PostAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
      case GET_POST_SUCCESS:
      case DELETE_POST_SUCCESS:
      case ADD_POST_SUCCESS:
      case UPDATE_POST_SUCCESS:
        return action.payload.newById;
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
        return [...action.payload.ids];
      case GET_POST_SUCCESS:
      case UPDATE_POST_SUCCESS:
        return [action.payload.id];
      case DELETE_POST_SUCCESS:
        return [...state].filter(id => id !== action.payload.id);
      case ADD_POST_SUCCESS:
        return [action.payload.id, ...state];
      default:
        return state;
    }
  },
  status: (state = initState.status, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return { ...state, fetchingPosts: true };
      case FETCH_POSTS_SUCCESS:
      case FETCH_POSTS_FAILED:
        return { ...state, fetchingPosts: false };
      case GET_POST:
        return { ...state, gettingPost: true };
      case GET_POST_SUCCESS:
      case GET_POST_FAILED:
        return { ...state, gettingPost: false };
      case DELETE_POST:
        return { ...state, deletingPost: true };
      case DELETE_POST_SUCCESS:
      case DELETE_POST_FAILED:
        return { ...state, deletingPost: false };
      case ADD_POST:
        return { ...state, addingPost: true };
      case ADD_POST_SUCCESS:
      case ADD_POST_FAILED:
        return { ...state, addingPost: false };
      case UPDATE_POST:
        return { ...state, updatingPost: true };
      case UPDATE_POST_SUCCESS:
      case UPDATE_POST_FAILED:
        return { ...state, updatingPost: false };
      default:
        return state;
    }
  }
});
