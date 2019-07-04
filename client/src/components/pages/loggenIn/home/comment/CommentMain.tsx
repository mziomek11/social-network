import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";
import { isNull } from "util";

import CommentMenu from "./CommentMenu";
import CommentUpdate from "./CommentUpdate";
import SubComments from "../subComment/SubComments";
import CommentContent from "../shared/CommentContent";
import { openReplying } from "../../../../../store/comment/actions";
import { getImage } from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { Comment as CommentType } from "../../../../../store/comment/models";
import { User } from "../../../../../store/auth/models";
import { Post } from "../../../../../store/post/models";

type OwnProps = {
  commentId: string;
  postId: string;
};

type DispatchProps = {
  openReplying: () => void;
};

type StateProps = {
  comment: CommentType;
  subCommentsCount: number;
  post: Post;
  user: User | null;
};

type Props = OwnProps & StateProps & DispatchProps;

const CommentElement: React.FC<Props> = ({
  comment,
  user,
  post,
  commentId,
  postId,
  subCommentsCount,
  openReplying
}) => {
  const [updating, setUpdating] = React.useState<boolean>(false);

  const canDelete: boolean =
    !isNull(user) && (user._id === post.owner || user._id === comment.owner);
  const canUpdate: boolean = !isNull(user) && user._id === comment.owner;

  return (
    <Comment>
      <Comment.Avatar src={getImage(comment.authorGender)} />
      {(canDelete || canUpdate) && !updating && (
        <CommentMenu
          canDelete={canDelete}
          canUpdate={canUpdate}
          onUpdateClick={() => setUpdating(true)}
          commentId={commentId}
        />
      )}
      {updating ? (
        <CommentUpdate
          commentId={commentId}
          startContent={comment.content}
          onUpdateDone={() => setUpdating(false)}
          onCancelClick={() => setUpdating(false)}
        />
      ) : (
        <CommentContent opinionData={comment} onReply={() => openReplying()} />
      )}
      <SubComments
        postId={postId}
        commentId={commentId}
      />
    </Comment>
  );
};

const mapStateToProps = (
  state: RootState,
  { commentId, postId }: OwnProps
): StateProps => {
  return {
    comment: state.comment.byId[commentId],
    subCommentsCount: state.subComment.countByCommentId[commentId],
    post: state.post.byId[postId],
    user: state.auth.user
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    openReplying: () => dispatch(openReplying(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentElement);
