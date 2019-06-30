import React from "react";
import { RootState } from "MyTypes";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

type StateProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
};
type OwnProps = {
  component: any;
  [key: string]: any;
};
type Props = StateProps & OwnProps;

const PrivateRoute: React.FC<Props> = ({
  component,
  isLoading,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) {
          return <h2>Loading...</h2>;
        } else if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return React.createElement(component, props);
        }
      }}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isLoading: state.auth.status.isInitChecking,
    isAuthenticated: state.auth.status.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
