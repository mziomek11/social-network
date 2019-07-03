import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Card, Form, Image, Icon } from "semantic-ui-react";

import Avatar from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { updatePost } from "../../../../../store/post/actions";
import { Post, AddPostData } from "../../../../../store/post/models";

type DispatchProps = {
  updatePost: (data: AddPostData) => void;
};

type OwnProps = {
  postId: string;
  closeWindow: () => void;
};

type StateProps = {
  post: Post;
  updatingPost: boolean;
};

type Props = DispatchProps & StateProps & OwnProps;

type State = Readonly<{
  content: string;
}>;

class PostUpdate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    const { content } = this.props.post;
    this.setState({ content: content ? content : "" });
  }
  componentWillReceiveProps({ updatingPost }: Props) {
    if (this.props.updatingPost && !updatingPost) this.props.closeWindow();
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { updatePost } = this.props;
    const { content } = this.state;
    if (content !== "") updatePost({ content });
  };
  render() {
    const { post, updatingPost } = this.props;
    if (!post) return null;
    const { authorName, date, image, authorGender } = post;
    return (
      <div className="post-update-container">
        <Card className="card-main card-post-update">
          <Card.Content>
            <Icon
              name="close"
              onClick={this.props.closeWindow}
              className="card-icon"
            />
            <Avatar gender={authorGender} />
            <Card.Header>{authorName}</Card.Header>
            <Card.Meta>{date.toString()}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea
                value={this.state.content}
                onChange={e =>
                  this.setState({ content: e.currentTarget.value })
                }
                autoFocus
              />
              {image && <Image src={image} />}
              <Form.Button primary loading={updatingPost}>
                Update
              </Form.Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { postId }: OwnProps
): StateProps => {
  return {
    post: state.post.byId[postId],
    updatingPost: state.post.status.updatingPost
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    updatePost: (data: AddPostData) => dispatch(updatePost(postId, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostUpdate);
