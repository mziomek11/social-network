import * as authActions from "./auth/actions";
import * as postActions from "./post/actions";
import * as commentActions from "./comment/actions";
import * as subCommentActions from "./subComment/actions";

export default {
  auth: authActions,
  post: postActions,
  comment: commentActions,
  subComment: subCommentActions
};
