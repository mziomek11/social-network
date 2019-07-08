import React from "react";
import { connect } from "react-redux";
import { Container, Loader } from "semantic-ui-react";

import PostList from "./post/List";
import PostAddForm from "./post/AddForm";
import { RootState } from "MyTypes";
import "./styles.scss";

type StateProps = {
  fetchingPosts: boolean;
};

const Home: React.FC<StateProps> = ({ fetchingPosts }) => {
  return (
    <Container className="posts">
      <PostAddForm />
      <PostList />
      <Loader
        active={fetchingPosts}
        className="posts__card posts__loader"
        inline
      />
    </Container>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fetchingPosts: state.post.status.fetchingPosts
  };
};

export default connect(mapStateToProps)(Home);
