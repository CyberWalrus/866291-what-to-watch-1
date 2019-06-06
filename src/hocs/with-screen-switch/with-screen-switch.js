import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {compose} from "recompose";
import {getAuthorizationStatus} from "../../store/user/selectors.js";
import RoutePath from "../../routes.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import MyList from "../../components/my-list/my-list.jsx";
import FilmScreen from "../../components/film-screen/film-screen.jsx";
import withFilmRoute from "../with-film-route/with-film-route.js";

const FilmScreenRoute = withFilmRoute(FilmScreen);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path={RoutePath.INDEX}
              exact
              render={() => (
                <Component
                  isAuthorizationRequired={this.props.isAuthorizationRequired}
                />
              )}
            />
            <Route exact path={RoutePath.MY_LIST} component={MyList}/>
            <Route exact path={RoutePath.FILM} component={FilmScreenRoute}/>
            <Route exact path={RoutePath.LOGIN} component={SignIn} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
  WithScreenSwitch.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };
  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export default compose(
    connect(mapStateToProps),
    withScreenSwitch
);
