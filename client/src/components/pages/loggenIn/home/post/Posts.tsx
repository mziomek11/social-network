import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import PostElement from "./Post";
import { fetchPosts } from "../../../../../store/post/actions";
import { fetchComments } from "../../../../../store/comment/actions";
import { fetchSubComments } from "../../../../../store/subComment/actions";

type StoreProps = {
  postsIds: string[];
};

type DispatchProps = {
  fetchPosts: () => void;
  fetchComments: () => void;
  fetchSubComments: () => void;
};

type Props = StoreProps & DispatchProps;

class Posts extends Component<Props, {}> {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchComments();
    this.props.fetchSubComments();
  }
  render() {
    const { postsIds } = this.props;
    return (
      <div>
        {postsIds.map(id => (
          <PostElement key={id} postId={id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StoreProps => {
  return {
    postsIds: state.post.allIds
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: () => dispatch(fetchComments()),
    fetchSubComments: () => dispatch(fetchSubComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
