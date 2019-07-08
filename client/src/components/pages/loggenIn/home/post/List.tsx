import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import Post from ".";
import { fetchPosts } from "../../../../../store/post/actions";

type StoreProps = {
  postsIds: string[];
  isFetchingPosts: boolean;
  canFetchMore: boolean;
};

type DispatchProps = {
  fetchPosts: () => void;
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
    if (this.props.isFetchingPosts || !this.props.canFetchMore) return;
    if (window.scrollY + window.innerHeight > this.getScrollHeight() - 100)
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
    isFetchingPosts: state.post.status.fetchingPosts,
    canFetchMore: state.post.status.canFetchMore
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
