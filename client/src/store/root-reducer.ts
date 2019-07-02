import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import postReducer from "./post/reducer";
import commentReducer from "./comment/reducer";
import subCommentReducer from "./subComment/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  subComment: subCommentReducer
});

export default rootReducer;
