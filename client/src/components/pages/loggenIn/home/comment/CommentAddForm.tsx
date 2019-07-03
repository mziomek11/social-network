import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { addComment } from "../../../../../store/comment/actions";

type OwnProps = {
  postId: string;
};

type DispatchProps = {
  addComment: (content: string) => void;
};

type Props = OwnProps & DispatchProps;

const CommentAddForm: React.FC<Props> = ({ addComment }) => {
  const [comment, setComment] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) return;
    addComment(comment);
    setComment("");
    setIsTyping(false);
  };
  return isTyping ? (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        fluid
        placeholder="Your comment..."
        size="small"
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="card-input"
        autoFocus
      />
    </Form>
  ) : (
    <span className="comments-clickable" onClick={() => setIsTyping(true)}>
      Write comment...
    </span>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    addComment: (content: string) =>
      dispatch(
        addComment({
          postId,
          content
        })
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentAddForm);
