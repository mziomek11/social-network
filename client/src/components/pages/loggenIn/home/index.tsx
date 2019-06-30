import React from "react";
import { Container } from "semantic-ui-react";

import Posts from "./Posts";
import PostAddForm from "./PostAddForm";
import MessageMenu from "./MessageMenu";
import "./styles.scss";

const Home = () => {
  return (
    <Container className="main-container">
      <PostAddForm />
      <Posts />
      <MessageMenu />
    </Container>
  );
};

export default Home;
