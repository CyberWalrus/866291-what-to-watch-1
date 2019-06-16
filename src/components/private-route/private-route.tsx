import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {connect} from "react-redux";
import RoutePath from "../../routes";
import {StateApp} from "../../type/reducer";

interface PropsInsert {
  rest?: any,
  path?: string,
  component: any,
  location: object,
  isAuthor?: boolean,
  redirectPath?: string
}
interface PropsState {
  isAuthorizationRequired: boolean,
}
type Props = PropsInsert & PropsState;

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

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
