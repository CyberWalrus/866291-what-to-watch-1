import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import RoutePath from "../../routes.js";
import MainScreen from "../main-screen/main-screen.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import MyList from "../my-list/my-list.jsx";
import FilmScreen from "../film-screen/film-screen.jsx";
import FilmAddReview from "../film-add-review/film-add-review.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import withFilmRoute from "../../hocs/with-film-route/with-film-route.js";
import withAuthorizationState from "../../hocs/with-authorization-state/with-authorization-state.js";
import withReviewState from "../../hocs/with-review-state/with-review-state.js";

const FilmScreenRoute = withFilmRoute(FilmScreen);
const SignInWithState = withAuthorizationState(SignIn);
const FilmAddReviewState = withReviewState(FilmAddReview);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={RoutePath.INDEX} exact render={() => <MainScreen />} />
          <Route
            exact
            path={RoutePath.FILM}
            render={(props) => (
              <FilmScreenRoute id={parseInt(props.match.params.id, 10)} />
            )}
          />
          <PrivateRoute exact path={RoutePath.MY_LIST} component={MyList} />
          <PrivateRoute
            exact
            path={RoutePath.ADD_REVIEW}
            component={(props) => (
              <FilmAddReviewState id={parseInt(props.match.params.id, 10)} />
            )}
          />
          <PrivateRoute
            exact
            path={RoutePath.LOGIN}
            redirectPath={RoutePath.INDEX}
            isAuthor={false}
            component={SignInWithState}
          />
          <Redirect to={RoutePath.INDEX} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
