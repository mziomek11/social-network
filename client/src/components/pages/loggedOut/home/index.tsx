import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Grid } from "semantic-ui-react";

import { RootState } from "MyTypes";
import RegisterForm from "./RegisterForm";
import Community from "./Community";
import "./styles.scss";

type StateProps = { isAuthenticated: boolean };

const Login: React.FC<StateProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <Container className="home">
      <Grid>
        <Grid.Row>
          <Grid.Column
            floated="left"
            computer={7}
            only={"computer"}
            className="home__left"
          >
            <Community />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} floated="right">
            <RegisterForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isAuthenticated: state.auth.status.isAuthenticated
  };
};

export default connect(mapStateToProps)(Login);
