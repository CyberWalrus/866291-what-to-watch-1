import * as React from "react";
import {PureComponent, ComponentClass, ReactElement} from "react";
import {FilmRoute} from "../../constants";

interface Props {
  id: number;
}
interface State {
  route: FilmRoute;
}
const withFilmRoute = (Component: any): ComponentClass<Props, State> => {
  class WithFilmRoute extends PureComponent<Props, State> {
    public constructor(props: Props) {
      super(props);

      this.state = {
        route: FilmRoute.OVERVIEW
      };

      this.handleChangeFilmRoute = this.handleChangeFilmRoute.bind(this);
    }
    public handleChangeFilmRoute(route: FilmRoute): void {
      this.setState({
        route
      });
    }

    public render(): ReactElement {
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
