import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {connect} from "react-redux";
import RoutePath from "../../routes";

interface Props {
  rest: any,
  path: string,
  component: any,
  isAuthorizationRequired: boolean,
  location: object,
  isAuthor: boolean,
  redirectPath: string
}
const PrivateRoute = ({
  component: Component,
  isAuthorizationRequired,
  rest,
  redirectPath = RoutePath.LOGIN,
  isAuthor = true,
  path
}: Props) => {
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

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
