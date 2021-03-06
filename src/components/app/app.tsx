import * as React from "react";
import {PureComponent, ReactElement} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath from "../../routes";
import PageMain from "../page-main/page-main";
import PageSignIn from "../page-sign-in/page-sign-in";
import PageMyList from "../page-my-list/page-my-list";
import PageFilm from "../page-film/page-film";
import PageAddReview from "../page-add-review/page-add-review";
import PrivateRoute from "../private-route/private-route";
import withFilmRoute from "../../hocs/with-film-route/with-film-route";
import withAuthorizationState from "../../hocs/with-authorization-state/with-authorization-state";
import withReviewState from "../../hocs/with-review-state/with-review-state";
import {Operation} from "../../store/data/data";
import {getActive} from "../../store/data/selectors";
import {StateApp, ThunkDispatch} from "../../type/reducer";

const PageFilmWithRoute = withFilmRoute(PageFilm);
const PageSignInWithState = withAuthorizationState(PageSignIn);
const PageAddReviewWithState = withReviewState(PageAddReview);

interface PropsState {
  isActive: boolean;
}
interface PropsDispatch {
  loadFilms: () => void;
}
type Props = PropsState & PropsDispatch;
class App extends PureComponent<Props> {
  public componentDidMount(): void {
    if (!this.props.isActive) {
      this.props.loadFilms();
    }
  }
  public render(): ReactElement {
    if (!this.props.isActive) {
      return <div>Error</div>;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={RoutePath.INDEX}
            exact
            render={(): ReactElement => <PageMain />}
          />
          <Route
            exact
            path={RoutePath.FILM}
            render={(props: any): ReactElement => (
              <PageFilmWithRoute id={parseInt(props.match.params.id, 10)} />
            )}
          />
          <PrivateRoute exact path={RoutePath.MY_LIST} component={PageMyList} />
          <PrivateRoute
            exact
            path={RoutePath.ADD_REVIEW}
            component={(props: any): ReactElement => (
              <PageAddReviewWithState
                id={parseInt(props.match.params.id, 10)}
              />
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
  }
}

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    isActive: getActive(state)
  });
const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  loadFilms: (): void => {
    dispatch(Operation.loadFilms());
  }
});

export {App};

export default connect<Props, PropsDispatch, {}, StateApp>(
  mapStateToProps,
  mapDispatchToProps
)(App);
