import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Container, Card, Image, Form } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { postActions } from "../../../../store/post";
import { Post, AddPostData } from "../../../../store/post/models";
import { User } from "../../../../store/auth/models";

type DispatchProps = {
  getPost: (id: string) => void;
  updatePost: (id: string, data: AddPostData) => void;
};

type StateProps = {
  post: Post | null;
  user: User | null;
};

type RouterProps = RouteComponentProps<{ id: string }>;

type Props = DispatchProps & StateProps & RouterProps;

type State = Readonly<{
  content: string;
}>;

class UpdatePost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  componentWillReceiveProps({ post, match }: Props) {
    if (post && post._id === match.params.id) {
      this.setState({
        content: post.content ? post.content : ""
      });
    }
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { updatePost, match } = this.props;
    const { content } = this.state;
    updatePost(match.params.id, { content });
  };
  render() {
    const { post, user, match } = this.props;
    if (!post || !user) return null;
    if (match.params.id !== post._id) return null;
    if (user._id !== post.owner) return <Redirect to="/" />;
    const { authorName, date, image } = post;
    return (
      <Container>
        <Card className="card-main">
          <Card.Content>
            <Card.Header>{authorName}</Card.Header>
            <Card.Meta>{date.toString()}</Card.Meta>
          </Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={this.state.content}
              onChange={e => this.setState({ content: e.target.value })}
            />
            {image && <Image src={image} />}
            <Form.Button primary>Update</Form.Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    post: state.post.byId[state.post.allIds[0]],
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getPost: (id: string) => dispatch(postActions.getPost(id)),
    updatePost: (id: string, data: AddPostData) =>
      dispatch(postActions.updatePost(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePost);
