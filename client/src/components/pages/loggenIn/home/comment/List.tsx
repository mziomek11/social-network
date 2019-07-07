import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import CommentMain from ".";
import ShowMoreComments from "./ShowMore";
import CommentAddForm from "./AddForm";
import { RootState } from "MyTypes";
import { commentActions } from "../../../../../store/comment";
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
};

type Props = OwnProps & StateProps & DispatchProps;

const Comments: React.FC<Props> = ({
  allComments,
  commentsById,
  postId,
  commentsCount,
  setCommentCount
}) => {
  const commentsPerAdd: number = 2;
  const [commentsToShow, setCommnetsToShow] = React.useState<number>(2);
  const postComments: CommentType[] = allComments
    .map(id => commentsById[id])
    .filter(comment => comment.post === postId);

  if (commentsCount !== postComments.length)
    setCommentCount(postComments.length);

  postComments.splice(0, postComments.length - commentsToShow);
  return (
    <React.Fragment>
      <ShowMoreComments
        postId={postId}
        commentsToShow={commentsToShow}
        onShowMoreClick={() =>
          setCommnetsToShow(commentsToShow + commentsPerAdd)
        }
      />
      {postComments.length > 0 && <Comment.Group>
        {postComments.map(({ _id }) => (
          <CommentMain key={_id} commentId={_id} postId={postId} />
        ))}
      </Comment.Group>}
      <CommentAddForm
        postId={postId}
        onAddingDone={() => setCommnetsToShow(commentsToShow + 1)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: RootState,
  { postId }: OwnProps
): StateProps => {
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
