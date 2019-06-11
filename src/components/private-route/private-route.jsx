import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../store/user/selectors.js";
import {connect} from "react-redux";
import RoutePath from "../../routes.js";

const PrivateRoute = ({
  component: Component,
  isAuthorizationRequired,
  rest,
  redirectPath = RoutePath.LOGIN,
  isAuthor = true,
  path
}) => {
  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        isAuthorizationRequired === isAuthor ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  rest: PropTypes.any,
  path: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  isAuthor: PropTypes.bool,
  redirectPath: PropTypes.string
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
