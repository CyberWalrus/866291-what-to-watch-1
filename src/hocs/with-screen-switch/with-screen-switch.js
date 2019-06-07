import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {compose} from "recompose";
import {getAuthorizationStatus, getError} from "../../store/user/selectors.js";
import RoutePath from "../../routes.js";
import {Operation} from "../../store/user/user.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import MyList from "../../components/my-list/my-list.jsx";
import FilmScreen from "../../components/film-screen/film-screen.jsx";
import FilmAddReview from "../../components/film-add-review/film-add-review.jsx";
import withFilmRoute from "../with-film-route/with-film-route.js";
import withAuthorizationState from "../with-authorization-state/with-authorization-state.js";
import withReviewState from "../with-review-state/with-review-state.js";
import WithPrivateRoute from "../with-private-route/with-private-route.js";

const FilmScreenRoute = withFilmRoute(FilmScreen);
const SignInWithState = withAuthorizationState(SignIn);
const FilmAddReviewState = withReviewState(FilmAddReview);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path={RoutePath.INDEX} exact render={() => <Component />} />
            <Route
              exact
              path={RoutePath.FILM}
              render={(props) => (
                <FilmScreenRoute id={parseInt(props.match.params.id, 10)} />
              )}
            />
            <WithPrivateRoute
              exact
              path={RoutePath.MY_LIST}
              component={MyList}
            />
            <WithPrivateRoute
              exact
              path={RoutePath.ADD_REVIEW}
              component={(props) => (
                <FilmAddReviewState id={parseInt(props.match.params.id, 10)} />
              )}
            />
            <WithPrivateRoute
              exact
              path={RoutePath.LOGIN}
              redirectPath={RoutePath.INDEX}
              isAuthor={false}
              component={() => (
                <SignInWithState
                  onSubmitClick={this.props.signIn}
                  errorMessage={this.props.errorMessage}
                />
              )}
            />
            <Redirect to={RoutePath.INDEX} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
  WithScreenSwitch.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
  };
  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state),
    errorMessage: getError(state)
  });
const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password) => {
    dispatch(Operation.signIn(email, password));
  }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withScreenSwitch
);
