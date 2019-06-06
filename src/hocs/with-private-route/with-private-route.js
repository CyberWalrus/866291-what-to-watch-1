import React from "react";
import {Redirect, Route} from "react-router-dom";
import RoutePath from "../../routes.js";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../store/user/selectors.js";
import {connect} from "react-redux";

const WithPrivateRoute = ({component: Component, isAuthorizationRequired, rest}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthorizationRequired === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: RoutePath.LOGIN,
            state: {from: props.location}
          }}
        />
      )
    }
  />
);
WithPrivateRoute.propTypes = {
  rest: PropTypes.any,
  component: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export default connect(mapStateToProps)(WithPrivateRoute);
