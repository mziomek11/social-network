import React from "react";
import { Container } from "semantic-ui-react";

import PostList from "./post/List";
import PostAddForm from "./post/AddForm";
import "./styles.scss";

const Home = () => {
  return (
    <Container className="posts">
      <PostAddForm />
      <PostList />
    </Container>
  );
};

export default Home;
