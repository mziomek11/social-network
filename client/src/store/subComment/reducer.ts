import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import { deepCopy } from "../../utils";
import {
  FETCH_SUBCOMMENTS,
  FETCH_SUBCOMMENTS_SUCCESS,
  FETCH_SUBCOMMENTS_FAILED,
  DELETE_SUBCOMMENT,
  DELETE_SUBCOMMENT_SUCCESS,
  DELETE_SUBCOMMENT_FAILED,
  ADD_SUBCOMMENT,
  ADD_SUBCOMMENT_SUCCESS,
  ADD_SUBCOMMENT_FAILED,
  UPDATE_SUBCOMMENT,
  UPDATE_SUBCOMMENT_SUCCESS,
  UPDATE_SUBCOMMENT_FAILED,
  SET_SUBCOMMENTS_COUNT
} from "./constants";
import { SubCommentsById } from "./models";
import * as actions from "./actions";

type SubCommentAction = ActionType<typeof actions>;
type SubCommentState = Readonly<{
  byId: SubCommentsById;
  allIds: string[];
  status: {
    fetchingSubComments: boolean;
    gettingSubComment: boolean;
    deletingSubComment: boolean;
    addingSubComment: boolean;
    updatingSubComment: boolean;
  };
  countByCommentId: { [postId: string]: number };
}>;

const initState: SubCommentState = {
  byId: {},
  allIds: [],
  status: {
    fetchingSubComments: false,
    gettingSubComment: false,
    deletingSubComment: false,
    addingSubComment: false,
    updatingSubComment: false
  },
  countByCommentId: {}
};

export default combineReducers<SubCommentState, SubCommentAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case FETCH_SUBCOMMENTS_SUCCESS:
      case DELETE_SUBCOMMENT_SUCCESS:
      case ADD_SUBCOMMENT_SUCCESS:
      case UPDATE_SUBCOMMENT_SUCCESS:
        return action.payload.newById;
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case FETCH_SUBCOMMENTS_SUCCESS:
        const idsWithDupli = [...state, ...action.payload.ids];
        return idsWithDupli.filter((id, i) => idsWithDupli.indexOf(id) === i);
      case DELETE_SUBCOMMENT_SUCCESS:
        return [...state].filter(id => id !== action.payload.id);
      case ADD_SUBCOMMENT_SUCCESS:
        return [...state, action.payload.id];
      case UPDATE_SUBCOMMENT_SUCCESS:
      default:
        return state;
    }
  },
  status: (state = initState.status, action) => {
    switch (action.type) {
      case FETCH_SUBCOMMENTS:
        return { ...state, fetchingSubComments: true };
      case FETCH_SUBCOMMENTS_SUCCESS:
      case FETCH_SUBCOMMENTS_FAILED:
        return { ...state, fetchingSubComments: false };
      case DELETE_SUBCOMMENT:
        return { ...state, deletingSubComment: true };
      case DELETE_SUBCOMMENT_SUCCESS:
      case DELETE_SUBCOMMENT_FAILED:
        return { ...state, deletingSubComment: false };
      case ADD_SUBCOMMENT:
        return { ...state, addingSubComment: true };
      case ADD_SUBCOMMENT_SUCCESS:
      case ADD_SUBCOMMENT_FAILED:
        return { ...state, addingSubComment: false };
      case UPDATE_SUBCOMMENT:
        return { ...state, updatingSubComment: true };
      case UPDATE_SUBCOMMENT_SUCCESS:
      case UPDATE_SUBCOMMENT_FAILED:
        return { ...state, updatingSubComment: false };
      default:
        return state;
    }
  },
  countByCommentId: (state = initState.countByCommentId, action) => {
    switch (action.type) {
      case SET_SUBCOMMENTS_COUNT:
        const newState = deepCopy(state);
        newState[action.payload.id] = action.payload.count;
        return newState;
      default:
        return state;
    }
  }
});
