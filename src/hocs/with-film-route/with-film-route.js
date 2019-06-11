import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FilmRoute} from "../../constants.js";

const withFilmRoute = (Component) => {
  class WithFilmRoute extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        route: FilmRoute.OVERVIEW
      };

      this.handleChangeFilmRoute = this.handleChangeFilmRoute.bind(this);
    }
    handleChangeFilmRoute(evt) {
      this.setState({
        route: evt.target.text
      });
    }

    render() {
      return (
        <Component
          id={this.props.id}
          route={this.state.route}
          onChangeFilmRoute={this.handleChangeFilmRoute}
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
