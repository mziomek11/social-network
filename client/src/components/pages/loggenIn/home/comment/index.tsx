import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";
import { isNull } from "util";

import CommentMenu from "./Menu";
import CommentUpdateForm from "./UpdateForm";
import SubCommentList from "../subComment/List";
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
  post: Post;
  user: User | null;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  updating: boolean;
};

class CommentElement extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { commentId, comment } = this.props;
    const { content } = comment;
    if (commentId !== nextProps.commentId) return true;
    if (content !== nextProps.comment.content) return true;
    if (this.state.updating !== nextState.updating) return true;
    return false;
  }
  readonly state: State = {
    updating: false
  };
  setUpdating = (updating: boolean) => this.setState({ updating });
  render() {
    const { comment, user, post, commentId, postId, openReplying } = this.props;
    const canDelete: boolean =
      !isNull(user) && (user._id === post.owner || user._id === comment.owner);
    const canUpdate: boolean = !isNull(user) && user._id === comment.owner;
    return (
      <Comment>
        <Comment.Avatar src={getImage(comment.authorGender)} />
        {(canDelete || canUpdate) && !this.state.updating && (
          <CommentMenu
            canDelete={canDelete}
            canUpdate={canUpdate}
            onUpdateClick={() => this.setUpdating(true)}
            commentId={commentId}
          />
        )}
        {this.state.updating ? (
          <CommentUpdateForm
            commentId={commentId}
            startContent={comment.content}
            onUpdateDone={() => this.setUpdating(false)}
            onCancelClick={() => this.setUpdating(false)}
          />
        ) : (
          <CommentContent
            opinionData={comment}
            onReply={() => openReplying()}
          />
        )}
        <SubCommentList postId={postId} commentId={commentId} />
      </Comment>
    );
  }
}

// const CommentElement: React.FC<Props> = ({
//   comment,
//   user,
//   post,
//   commentId,
//   postId,
//   openReplying
// }) => {
//   const [updating, setUpdating] = React.useState<boolean>(false);

//   const canDelete: boolean =
//     !isNull(user) && (user._id === post.owner || user._id === comment.owner);
//   const canUpdate: boolean = !isNull(user) && user._id === comment.owner;

//   return (
//     <Comment>
//       <Comment.Avatar src={getImage(comment.authorGender)} />
//       {(canDelete || canUpdate) && !updating && (
//         <CommentMenu
//           canDelete={canDelete}
//           canUpdate={canUpdate}
//           onUpdateClick={() => setUpdating(true)}
//           commentId={commentId}
//         />
//       )}
//       {updating ? (
//         <CommentUpdateForm
//           commentId={commentId}
//           startContent={comment.content}
//           onUpdateDone={() => setUpdating(false)}
//           onCancelClick={() => setUpdating(false)}
//         />
//       ) : (
//         <CommentContent opinionData={comment} onReply={() => openReplying()} />
//       )}
//       <SubCommentList postId={postId} commentId={commentId} />
//     </Comment>
//   );
// };

const mapStateToProps = (
  state: RootState,
  { commentId, postId }: OwnProps
): StateProps => {
  return {
    comment: state.comment.byId[commentId],
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
