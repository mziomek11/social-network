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
  id: string;
  toShow: number;
};

type Props = OwnProps & StateProps & DispatchProps;

class Comments extends React.Component<Props, {}> {
  render() {
    const {
      allComments,
      commentsById,
      id,
      commentsCount,
      setCommentCount,
      toShow
    } = this.props;

    const postComments: CommentType[] = allComments
      .map(id => commentsById[id])
      .filter(comment => comment.post === id);

    if (commentsCount !== postComments.length)
      setCommentCount(postComments.length);

    postComments.splice(0, postComments.length - toShow);
    return (
      <Comment.Group>
        {postComments.map(({ _id }) => (
          <CommentMain key={_id} id={_id} postId={id} />
        ))}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    commentsById: state.comment.byId,
    allComments: state.comment.allIds,
    commentsCount: state.comment.countByPostId[ownProps.id]
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => {
  return {
    setCommentCount: (count: number) =>
      dispatch(commentActions.setCommentCount(ownProps.id, count))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
