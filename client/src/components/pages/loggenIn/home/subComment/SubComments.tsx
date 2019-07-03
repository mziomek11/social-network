import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import SubCommentMain from "./SubCommentMain";
import { RootState } from "MyTypes";
import { subCommentActions } from "../../../../../store/subComment";
import {
  SubCommentsById,
  SubComment
} from "../../../../../store/subComment/models";

type StateProps = {
  allSubComments: string[];
  subCommentsById: SubCommentsById;
  subCommentsCount: number;
};

type DispatchProps = {
  setSubCommentCount: (count: number) => void;
};

type OwnProps = {
  commentId: string;
  postId: string;
  toShow: number;
};

type Props = OwnProps & StateProps & DispatchProps;

class SubComments extends React.Component<Props, {}> {
  render() {
    const {
      allSubComments,
      subCommentsById,
      commentId,
      postId,
      subCommentsCount,
      setSubCommentCount,
      toShow
    } = this.props;

    const subComments: SubComment[] = allSubComments
      .map(id => subCommentsById[id])
      .filter(subComment => subComment.comment === commentId);

    if (subCommentsCount !== subComments.length)
      setSubCommentCount(subComments.length);

    subComments.splice(0, subComments.length - toShow);

    if (subComments.length === 0) return null;
    return (
      <Comment.Group>
        {subComments.length > 0 &&
          subComments.map(({ _id }) => (
            <SubCommentMain
              key={_id}
              subCommentId={_id}
              postId={postId}
              commentId={commentId}
            />
          ))}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { commentId }: OwnProps
): StateProps => {
  return {
    subCommentsById: state.subComment.byId,
    allSubComments: state.subComment.allIds,
    subCommentsCount: state.subComment.countByCommentId[commentId]
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    setSubCommentCount: (count: number) =>
      dispatch(subCommentActions.setSubCommentCount(commentId, count))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComments);
