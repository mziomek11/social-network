import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RootState } from "MyTypes";
import { authActions } from "./store/auth";
import SocketManager from "./SocketManager";
import PrivateRoute from "./components/other/PrivateRoute";
import Header from "./components/header";

import LoginPage from "./components/pages/loggedOut/home";
import HomePage from "./components/pages/loggenIn/home/index";
import ProfilePage from "./components/pages/loggenIn/profile";
import MessagesPage from "./components/pages/loggenIn/messages";
import FriendsPage from "./components/pages/loggenIn/friends";
import "./scss/main.scss";

type StateProps = {
  isInitCheckDone: boolean;
};

type DispatchProps = {
  loadUser: () => void;
};

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.loadUser();
    console.log("DODAC ZEBY W KLINCIE PRZY USUNIECIU POSTA USUWALO KOMY I SUBKOMY I A PRZY USUNIECIU KOMA USUWALO SUKOMY")
  }
  render() {
    if (!this.props.isInitCheckDone) return null;
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <SocketManager />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/messages" component={MessagesPage} />
            <PrivateRoute exact path="/friends" component={FriendsPage} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isInitCheckDone: state.auth.status.isInitCheckDone
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadUser: () => dispatch(authActions.loadUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
