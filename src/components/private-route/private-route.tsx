import * as React from "react";
import {ReactElement, FunctionComponent} from "react";
import {Redirect, Route} from "react-router-dom";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {connect} from "react-redux";
import RoutePath from "../../routes";
import {StateApp} from "../../type/reducer";

interface PropsInsert {
  rest?: any;
  path?: string;
  component: any;
  location: object;
  isAuthor?: boolean;
  redirectPath?: string;
}
interface PropsState {
  isAuthorizationRequired: boolean;
}
type Props = PropsInsert & PropsState;

const PrivateRoute: FunctionComponent<Props> = ({
  component: Component,
  isAuthorizationRequired,
  rest,
  redirectPath = RoutePath.LOGIN,
  isAuthor = true,
  path
}: Props): ReactElement => {
  return (
    <Route
      {...rest}
      path={path}
      render={(props: any): ReactElement =>
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
