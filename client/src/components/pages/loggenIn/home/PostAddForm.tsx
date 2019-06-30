import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form, Card } from "semantic-ui-react";

import { postActions } from "../../../../store/post";
import { AddPostData } from "../../../../store/post/models";

type Props = {
  addPost: (data: AddPostData) => void;
};

const PostAddForm: React.FC<Props> = ({ addPost }) => {
  const [content, setContent] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > 0) addPost({ content });
  };
  return (
    <Card className="card-main">
      <Card.Content>
        <Card.Header>Add new post</Card.Header>
      </Card.Content>

      <Form onSubmit={handleSubmit} className="post-add-form">
        <Form.Input
          placeholder="Content..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="card-input"
        />
      </Form>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    addPost: (data: AddPostData) => dispatch(postActions.addPost(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostAddForm);
