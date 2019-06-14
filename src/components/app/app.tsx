import * as React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import RoutePath from "../../routes.js";
import PageMain from "../page-main/page-main.jsx";
import PageSignIn from "../page-sign-in/page-sign-in.jsx";
import PageMyList from "../page-my-list/page-my-list.jsx";
import PageFilm from "../page-film/page-film.jsx";
import PageAddReview from "../page-add-review/page-add-review.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import withFilmRoute from "../../hocs/with-film-route/with-film-route.js";
import withAuthorizationState from "../../hocs/with-authorization-state/with-authorization-state.js";
import withReviewState from "../../hocs/with-review-state/with-review-state.js";

const PageFilmWithRoute = withFilmRoute(PageFilm);
const PageSignInWithState = withAuthorizationState(PageSignIn);
const PageAddReviewWithState = withReviewState(PageAddReview);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={RoutePath.INDEX} exact render={() => <PageMain />} />
        <Route
          exact
          path={RoutePath.FILM}
          render={(props) => (
            <PageFilmWithRoute id={parseInt(props.match.params.id, 10)} />
          )}
        />
        <PrivateRoute exact path={RoutePath.MY_LIST} component={PageMyList} />
        <PrivateRoute
          exact
          path={RoutePath.ADD_REVIEW}
          component={(props) => (
            <PageAddReviewWithState id={parseInt(props.match.params.id, 10)} />
          )}
        />
        <PrivateRoute
          exact
          path={RoutePath.LOGIN}
          redirectPath={RoutePath.INDEX}
          isAuthor={false}
          component={PageSignInWithState}
        />
        <Redirect to={RoutePath.INDEX} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
