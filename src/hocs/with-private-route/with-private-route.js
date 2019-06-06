import React from "react";
import {Redirect, Route} from "react-router-dom";
import RoutePath from "../../routes.js";
import PropTypes from "prop-types";

export const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Route
          render={() =>
            !this.props.isAuthorizationRequired ? (
              <Component />
            ) : (
              <Redirect to={RoutePath.LOGIN} />
            )
          }
        />
      );
    }
  }
  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };
  return WithPrivateRoute;
};
