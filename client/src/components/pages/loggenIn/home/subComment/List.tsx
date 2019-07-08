import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import SubCommentAddForm from "./AddForm";
import SubCommentMain from ".";
import ShowMoreSubComments from "./ShowMore";
import { RootState } from "MyTypes";
import {
  setFetchedSubCommentCount,
  fetchSubComments
} from "../../../../../store/subComment/actions";
import {
  SubCommentsById,
  SubComment
} from "../../../../../store/subComment/models";

type StateProps = {
  allSubComments: string[];
  subCommentsById: SubCommentsById;
  subCommentsCount: number;
  isReplying: boolean;
  fetchedSubCommentsCount: number;
};

type DispatchProps = {
  setFetchedSubCommentCount: (count: number) => void;
  fetchSubComments: (fetchedSubComsCount: number) => void;
};

type OwnProps = {
  commentId: string;
  postId: string;
};

type Props = OwnProps & StateProps & DispatchProps;

const SubComments: React.FC<Props> = ({
  allSubComments,
  subCommentsById,
  commentId,
  postId,
  subCommentsCount,
  setFetchedSubCommentCount,
  isReplying,
  fetchedSubCommentsCount,
  fetchSubComments
}) => {
  useEffect(() => {
    if (isReplying && subCommentsCount > 0 && fetchedSubCommentsCount === 0) {
      fetchSubComments(0);
    }
  }, [isReplying]);
  const subComments: SubComment[] = allSubComments
    .map(id => subCommentsById[id])
    .filter(subComment => subComment.comment === commentId);

  if (fetchedSubCommentsCount !== subComments.length) {
    setFetchedSubCommentCount(subComments.length);
  }
  return (
    <React.Fragment>
      {subCommentsCount > fetchedSubCommentsCount && (
        <ShowMoreSubComments
          fetchedSubCommentsCount={fetchedSubCommentsCount}
          onShowMoreClick={() => fetchSubComments(fetchedSubCommentsCount)}
        />
      )}
      {(subComments.length > 0 ||
        (isReplying &&
          (subCommentsCount === 0 || fetchedSubCommentsCount > 0))) && (
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
          {isReplying && <SubCommentAddForm commentId={commentId} />}
        </Comment.Group>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: RootState,
  { commentId }: OwnProps
): StateProps => {
  return {
    subCommentsById: state.subComment.byId,
    allSubComments: state.subComment.allIds,
    fetchedSubCommentsCount: state.subComment.countByCommentId[commentId],
    subCommentsCount: state.comment.byId[commentId].subCommentsCount,
    isReplying: state.comment.replyingOpen.indexOf(commentId) > -1
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    setFetchedSubCommentCount: (count: number) =>
      dispatch(setFetchedSubCommentCount(commentId, count)),
    fetchSubComments: (fetchedSubComsCount: number) =>
      dispatch(fetchSubComments(commentId, fetchedSubComsCount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComments);
