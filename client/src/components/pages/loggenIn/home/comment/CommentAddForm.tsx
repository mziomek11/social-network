import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { commentActions } from "../../../../../store/comment";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  addComment: (content: string) => void;
};

type Props = OwnProps & DispatchProps;

const CommentAddForm: React.FC<Props> = ({ addComment }) => {
  const [comment, setComment] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) return;
    addComment(comment);
    setComment("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        fluid
        placeholder="Add comment..."
        size="large"
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="card-input"
      />
    </Form>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => {
  return {
    addComment: (content: string) =>
      dispatch(
        commentActions.addComment({
          postId: ownProps.id,
          content
        })
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentAddForm);
