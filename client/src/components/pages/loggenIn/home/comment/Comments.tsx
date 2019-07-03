import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import CommentMain from "./CommentMain";
import { RootState } from "MyTypes";
import { commentActions } from "../../../../../store/comment/";
import {
  CommentsById,
  Comment as CommentType
} from "../../../../../store/comment/models";

type StateProps = {
  allComments: string[];
  commentsById: CommentsById;
  commentsCount: number;
};

type DispatchProps = {
  setCommentCount: (count: number) => void;
};

type OwnProps = {
  postId: string;
  commentstoShow: number;
};

type Props = OwnProps & StateProps & DispatchProps;

class Comments extends React.Component<Props, {}> {
  render() {
    const {
      allComments,
      commentsById,
      postId,
      commentsCount,
      setCommentCount,
      commentstoShow
    } = this.props;

    const postComments: CommentType[] = allComments
      .map(id => commentsById[id])
      .filter(comment => comment.post === postId);

    if (commentsCount !== postComments.length)
      setCommentCount(postComments.length);

    postComments.splice(0, postComments.length - commentstoShow);
    return (
      <Comment.Group>
        {postComments.map(({ _id }) => (
          <CommentMain key={_id} commentId={_id} postId={postId} />
        ))}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state: RootState, {postId}: OwnProps): StateProps => {
  return {
    commentsById: state.comment.byId,
    allComments: state.comment.allIds,
    commentsCount: state.comment.countByPostId[postId]
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    setCommentCount: (count: number) =>
      dispatch(commentActions.setCommentCount(postId, count))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
