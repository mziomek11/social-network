import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import PostElement from "./Post";
import { postActions } from "../../../../store/post/";

type StoreProps = {
  postsIds: string[];
};

type DispatchProps = {
  fetchPosts: () => void;
};

type Props = StoreProps & DispatchProps;

class Posts extends Component<Props, {}> {
  componentDidMount() {
    this.props.fetchPosts();
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
    postsIds: state.post.allIds,

  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchPosts: () => dispatch(postActions.fetchPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
