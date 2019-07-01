import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILED,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILED,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILED
} from "./constants";
import { CommentsById } from "./models";
import * as actions from "./actions";

type CommentAction = ActionType<typeof actions>;
type CommentState = Readonly<{
  byId: CommentsById;
  allIds: string[];
  status: {
    fetchingComments: boolean;
    gettingComment: boolean;
    deletingComment: boolean;
    addingComment: boolean;
    updatingComment: boolean;
  };
}>;

const initState: CommentState = {
  byId: {},
  allIds: [],
  status: {
    fetchingComments: false,
    gettingComment: false,
    deletingComment: false,
    addingComment: false,
    updatingComment: false
  }
};

export default combineReducers<CommentState, CommentAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case FETCH_COMMENTS_SUCCESS:
      case DELETE_COMMENT_SUCCESS:
      case ADD_COMMENT_SUCCESS:
      case UPDATE_COMMENT_SUCCESS:
        return action.payload.newById;
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case FETCH_COMMENTS_SUCCESS:
        const idsWithDupli = [...state, ...action.payload.ids];
        return idsWithDupli.filter((id, i) => idsWithDupli.indexOf(id) === i);
      case DELETE_COMMENT_SUCCESS:
        return [...state].filter(id => id !== action.payload.id);
      case ADD_COMMENT_SUCCESS:
        return [action.payload.id, ...state];
      case UPDATE_COMMENT_SUCCESS:
      default:
        return state;
    }
  },
  status: (state = initState.status, action) => {
    switch (action.type) {
      case FETCH_COMMENTS:
        return { ...state, fetchingComments: true };
      case FETCH_COMMENTS_SUCCESS:
      case FETCH_COMMENTS_FAILED:
        return { ...state, fetchingComments: false };
      case DELETE_COMMENT:
        return { ...state, deletingComment: true };
      case DELETE_COMMENT_SUCCESS:
      case DELETE_COMMENT_FAILED:
        return { ...state, deletingComment: false };
      case ADD_COMMENT:
        return { ...state, addingComment: true };
      case ADD_COMMENT_SUCCESS:
      case ADD_COMMENT_FAILED:
        return { ...state, addingComment: false };
      case UPDATE_COMMENT:
        return { ...state, updatingComment: true };
      case UPDATE_COMMENT_SUCCESS:
      case UPDATE_COMMENT_FAILED:
        return { ...state, updatingComment: false };
      default:
        return state;
    }
  }
});
