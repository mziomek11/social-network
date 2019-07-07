import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Menu, Form } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { authActions } from "../../../store/auth";

type DispatchProps = {
  login: (username: string, password: string) => void;
};

type StateProps = {
  loginErrors: { [key: string]: string };
  isLoginLoading: boolean;
};

type Props = DispatchProps & StateProps;

const LoggedOut: React.FC<Props> = ({ login, loginErrors, isLoginLoading }) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginLoading) login(username, password);
  };
  const errorOccured: boolean = Object.keys(loginErrors).length > 0;
  return (
    <React.Fragment>
      <Menu.Item header className="header__logo">Social Network</Menu.Item>
      <Menu.Item position="right">
        <Form className="login" onSubmit={handleLogin}>
          <Form.Group>
            <Form.Input
              placeholder="Username"
              value={username}
              autoComplete="username"
              size="small"
              icon="user"
              iconPosition="left"
              onChange={e => setUsername(e.target.value)}
              error={errorOccured}
            />
            <Form.Input
              placeholder="Password"
              value={password}
              type="password"
              autoComplete="current-password"
              size="small"
              icon="key"
              iconPosition="left"
              onChange={e => setPassword(e.target.value)}
              error={errorOccured}
            />
            <Form.Button primary loading={isLoginLoading}>
              Login
            </Form.Button>
          </Form.Group>
        </Form>
      </Menu.Item>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    loginErrors: state.auth.errors.login,
    isLoginLoading: state.auth.status.isLoginLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (username: string, password: string) =>
      dispatch(authActions.login({ username, password }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedOut);
