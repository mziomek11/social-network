import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import AddForm from "./SubCommentAddForm";
import SubCommentMain from "./SubCommentMain";
import ShowMore from "./ShowMore";
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
  isReplying: boolean;
};

type DispatchProps = {
  setSubCommentCount: (count: number) => void;
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
  setSubCommentCount,
  isReplying
}) => {
  const subCommentsPerAdd: number = 2;
  const [subCommentsToShow, setSubCommnetsToShow] = React.useState<number>(0);
  useEffect(() => {
    if (isReplying && subCommentsToShow === 0)
      setSubCommnetsToShow(subCommentsPerAdd);
  }, [isReplying, subCommentsToShow]);

  const subComments: SubComment[] = allSubComments
    .map(id => subCommentsById[id])
    .filter(subComment => subComment.comment === commentId);

  if (subCommentsCount !== subComments.length) {
    setSubCommentCount(subComments.length);
  }

  subComments.splice(0, subCommentsCount - subCommentsToShow);

  return (
    <React.Fragment>
      <ShowMore
        subCommentsToShow={subCommentsToShow}
        commentId={commentId}
        onShowMoreClick={() =>
          setSubCommnetsToShow(subCommentsToShow + subCommentsPerAdd)
        }
      />
      {(subComments.length !== 0 || (isReplying && subCommentsToShow > 0)) && (
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
          {isReplying && (
            <AddForm
              commentId={commentId}
              onAddingDone={() => setSubCommnetsToShow(subCommentsToShow + 1)}
            />
          )}
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
    subCommentsCount: state.subComment.countByCommentId[commentId],
    isReplying: state.comment.replyingOpen.indexOf(commentId) > -1
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
