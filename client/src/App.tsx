import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RootState } from "MyTypes";
import { authActions } from "./store/auth";
import PrivateRoute from "./components/other/PrivateRoute";
import Header from "./components/header";
import LoginPage from "./components/pages/loggedOut/home";
import LoggedInPage from "./components/pages/loggenIn/home/index";
import UpdatePostPage from "./components/pages/loggenIn/update_post";
import ShowPostPage from "./components/pages/loggenIn/show_post";
import "./styles.scss";

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
  }
  render() {
    if (!this.props.isInitCheckDone) return null;
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={LoggedInPage} />
            <PrivateRoute
              exact
              path="/post/:id/update"
              component={UpdatePostPage}
            />
            <PrivateRoute exact path="/post/:id" component={ShowPostPage} />
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
