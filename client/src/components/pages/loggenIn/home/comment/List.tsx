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
  postCommentsCount: number;
  fetchedCommentsCount: number;
};

type DispatchProps = {
  setCommentCount: (count: number) => void;
  fetchComments: (fetchedCommentsCount: number) => void;
};

type OwnProps = {
  postId: string;
};

type Props = OwnProps & StateProps & DispatchProps;

const Comments: React.FC<Props> = ({
  allComments,
  commentsById,
  postId,
  fetchedCommentsCount,
  setCommentCount,
  postCommentsCount,
  fetchComments
}) => {
  const postComments: CommentType[] = allComments
    .map(id => commentsById[id])
    .filter(comment => comment.post === postId);

  if (fetchedCommentsCount !== postComments.length)
    setCommentCount(postComments.length);

  return (
    <React.Fragment>
      {postCommentsCount > fetchedCommentsCount && (
        <ShowMoreComments
          onShowMoreClick={() => fetchComments(fetchedCommentsCount)}
        />
      )}

      {postComments.length > 0 && (
        <Comment.Group>
          {postComments.map(({ _id }) => (
            <CommentMain key={_id} commentId={_id} postId={postId} />
          ))}
        </Comment.Group>
      )}
      <CommentAddForm postId={postId} />
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
    fetchedCommentsCount: state.comment.countByPostId[postId],
    postCommentsCount: state.post.byId[postId].commentsCount
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    setCommentCount: (count: number) =>
      dispatch(commentActions.setCommentCount(postId, count)),
    fetchComments: (fetchedCommentsCount: number) =>
      dispatch(commentActions.fetchComments(postId, fetchedCommentsCount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
