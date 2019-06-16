import * as React from "react";
import {PureComponent} from "react";
import {FilmRoute} from "../../constants";

interface Props {
  id: number
}
interface State {
  route: FilmRoute
}
const withFilmRoute = (Component) => {
  class WithFilmRoute extends PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        route: FilmRoute.OVERVIEW
      };

      this.handleChangeFilmRoute = this.handleChangeFilmRoute.bind(this);
    }
    handleChangeFilmRoute(route: FilmRoute): void {
      this.setState({
        route
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
  return WithFilmRoute;
};

export default withFilmRoute;
