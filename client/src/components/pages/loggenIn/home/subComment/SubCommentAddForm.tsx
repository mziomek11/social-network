import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form, Comment } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { closeReplying } from "../../../../../store/comment/actions";
import { addSubComment } from "../../../../../store/subComment/actions";
import { User } from "../../../../../store/auth/models";
import { getImage } from "../../../../other/Avatar";

type OwnProps = {
  commentId: string;
};

type StateProps = {
  isOpen: boolean;
  user: User | null;
};

type DispatchProps = {
  addSubComment: (content: string) => void;
  closeReplying: () => void;
};

type Props = OwnProps & DispatchProps & StateProps;

const SubCommentAddForm: React.FC<Props> = ({
  addSubComment,
  isOpen,
  closeReplying,
  user
}) => {
  const [subComment, setSubComment] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subComment.length === 0) return;
    addSubComment(subComment);
    setSubComment("");
    closeReplying();
  };
  if (!isOpen || !user) return null;
  return (
    <Comment>
      <Comment.Avatar src={getImage(user.gender)} />
      <Comment.Content className="subcomments-form-container">
        <Form onSubmit={handleSubmit} className="subcomments-form">
          <Form.Input
            fluid
            placeholder="Your anwser..."
            size="small"
            value={subComment}
            onChange={e => setSubComment(e.target.value)}
            className="card-input subcomments-form-input"
            autoFocus
          />
        </Form>
        <Comment.Actions className="subcomments-form-actions">
          <Comment.Action>Siema</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

const mapStateToProps = (
  state: RootState,
  { commentId }: OwnProps
): StateProps => {
  return {
    isOpen: state.comment.replyingOpen.indexOf(commentId) > -1,
    user: state.auth.user
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    addSubComment: (content: string) =>
      dispatch(addSubComment({ commentId, content })),
    closeReplying: () => dispatch(closeReplying(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCommentAddForm);
