import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import PostElement from "./Post";
import { postActions } from "../../../../../store/post";
import { commentActions } from "../../../../../store/comment";

type StoreProps = {
  postsIds: string[];
};

type DispatchProps = {
  fetchPosts: () => void;
  fetchComments: () => void;
};

type Props = StoreProps & DispatchProps;

class Posts extends Component<Props, {}> {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchComments();
  }
  render() {
    const { postsIds } = this.props;
    return (
      <div>
        {postsIds.map(id => (
          <PostElement key={id} id={id} />
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
    fetchPosts: () => dispatch(postActions.fetchPosts()),
    fetchComments: () => dispatch(commentActions.fetchComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
