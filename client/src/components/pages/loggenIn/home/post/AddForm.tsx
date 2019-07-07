import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form, Card, Header } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { postActions } from "../../../../../store/post";
import { AddPostData } from "../../../../../store/post/models";

type DispatchProps = {
  addPost: (data: AddPostData) => void;
};

type StateProps = {
  addingPost: boolean;
};

type Props = DispatchProps & StateProps;

const PostAddForm: React.FC<Props> = ({ addPost, addingPost }) => {
  const [content, setContent] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > 0) {
      setContent("");
      addPost({ content });
    }
  };
  return (
    <Card className="posts__card">
      <Card.Content>
        <Header size="large">Add new post</Header>
        <Form onSubmit={handleSubmit} className="posts__add">
          <Form.TextArea
            placeholder="Post content..."
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
            rows={5}
            className="posts__textarea posts__input"
          />
          <Form.Button primary loading={addingPost}>
            Add
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addingPost: state.post.status.addingPost
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    addPost: (data: AddPostData) => dispatch(postActions.addPost(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostAddForm);
