import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import Post from ".";
import { fetchPosts } from "../../../../../store/post/actions";
import { fetchComments } from "../../../../../store/comment/actions";
import { fetchSubComments } from "../../../../../store/subComment/actions";

type StoreProps = {
  postsIds: string[];
  isFetchingPosts: boolean;
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
    window.addEventListener("scroll", this.onScrollEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollEvent);
  }
  onScrollEvent = () => {
    if (this.props.isFetchingPosts) return;
    if (window.scrollY + window.innerHeight === this.getScrollHeight())
      this.props.fetchPosts();
  };
  getScrollHeight = () => {
    var D = document;
    return Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
  };
  render() {
    const { postsIds } = this.props;
    return (
      <div>
        {postsIds.map(id => (
          <Post key={id} postId={id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StoreProps => {
  return {
    postsIds: state.post.allIds,
    isFetchingPosts: state.post.status.fetchingPosts
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
