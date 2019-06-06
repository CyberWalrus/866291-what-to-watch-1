import React from "react";
import PropTypes from "prop-types";
import {FilmRoute} from "../../mock/constants.js";

const withFilmRoute = (Component) => {
  class WithFilmRoute extends React.PureComponent {
    constructor(props) {
      super(props);

      this.timeoutFunc = null;

      this.state = {
        route: FilmRoute.OVERVIEW
      };

      this.changeFilmRoute = this.changeFilmRoute.bind(this);
    }
    changeFilmRoute(evt) {
      this.setState({
        route: evt.target.text
      });
    }

    render() {
      return (
        <Component
          id={this.props.id}
          route={this.state.route}
          changeFilmRoute={this.changeFilmRoute}
        />
      );
    }
  }
  WithFilmRoute.propTypes = {
    id: PropTypes.number.isRequired
  };
  return WithFilmRoute;
};

export default withFilmRoute;
