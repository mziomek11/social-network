import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import LoggedInLinks from "./links/LoggedIn";
import LoggedOutLinks from "./links/LoggedOut";
import "./styles.scss";

type StateProps = {
  isAuthenticated: boolean;
};

const Header: React.FC<StateProps> = ({ isAuthenticated }) => {
  return (
    <Menu size="large" stackable>
      <Container className="header-content">
        {isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />}
      </Container>
    </Menu>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isAuthenticated: state.auth.status.isAuthenticated
  };
};

export default connect(mapStateToProps)(Header);
