import React from "react";
import FilmRoute from "../../mock/film-route.js";

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
          route={this.state.route}
          changeFilmRoute={this.changeFilmRoute}
        />
      );
    }
  }

  return WithFilmRoute;
};

export default withFilmRoute;
