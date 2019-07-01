import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Menu, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { authActions } from "../../../store/auth";

type DispatchProps = {
  logout: () => void;
};

const LoggedIn: React.FC<DispatchProps> = ({ logout }) => {
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };
  return (
    <React.Fragment>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/profile">
        Profile
      </Menu.Item>
      <Menu.Item as={Link} to="/messages">
        Messages
      </Menu.Item>
      <Menu.Item as={Link} to="/friends">
        Friends
      </Menu.Item>
      <Menu.Item position="right">
        <Form.Button primary onClick={handleClick}>
          Logout
        </Form.Button>
      </Menu.Item>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoggedIn);
