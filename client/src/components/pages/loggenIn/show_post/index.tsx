import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { postActions } from "../../../../store/post";
import { Post as PostType } from "../../../../store/post/models";
import Post from "../home/Post";

type DispatchProps = {
  getPost: (id: string) => void;
};

type StateProps = {
  post: PostType | null;
};

type RouterProps = RouteComponentProps<{ id: string }>;

type Props = DispatchProps & StateProps & RouterProps;

type State = Readonly<{
  content: string;
}>;

class ShowPost extends React.Component<Props, State> {
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
  render() {
    if (!this.props.post) return null;
    if (this.props.match.params.id !== this.props.post._id) return null;

    return (
      <Container>
        <Post id={this.props.match.params.id} showMenu={false}/>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    post: state.post.byId[state.post.allIds[0]]
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getPost: (id: string) => dispatch(postActions.getPost(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
