import * as React from "react";
import {PureComponent, ComponentClass, ReactElement} from "react";
import {NUMBER_FILM, TIMEOUT_INTERVAL} from "../../constants";
import {Redirect} from "react-router-dom";
import {routeToFilm} from "../../routes";

interface State {
  activeFilm: number;
  numberFilm: number;
  redirectId: number;
  timeOutId: number;
}

const withActiveFilm = (Component: any): ComponentClass<any, State> => {
  type P = React.ComponentProps<typeof Component>;
  class WithActiveFilm extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);
      this.state = {
        activeFilm: 0,
        numberFilm: NUMBER_FILM,
        redirectId: 0,
        timeOutId: 0
      };
      this._timeOutList = {};
      this.handleSetActiveFilm = this.handleSetActiveFilm.bind(this);
      this.handleRemoveActiveFilm = this.handleRemoveActiveFilm.bind(this);
      this.handleShowMore = this.handleShowMore.bind(this);
      this.handleToRedirect = this.handleToRedirect.bind(this);
    }
    public componentDidUpdate(): void {
      if (this.state.redirectId) {
        this.setState({
          redirectId: 0
        });
      }
    }
    public componentWillUnmount(): void {
      clearTimeout(this._timeOutList[this.state.timeOutId]);
    }

    public handleSetActiveFilm(id: number): void {
      this.setState({
        timeOutId: id
      });
      this._timeOutList[id] = setTimeout((): void => {
        this.setState({
          activeFilm: id,
          timeOutId: 0
        });
        clearTimeout(this._timeOutList[id]);
        delete this._timeOutList[id];
      }, TIMEOUT_INTERVAL);
    }

    public handleRemoveActiveFilm(id: number): void {
      clearTimeout(this._timeOutList[id]);
      delete this._timeOutList[id];
      this.setState({
        activeFilm: 0,
        timeOutId: 0
      });
    }

    public handleShowMore(): void {
      this.setState({
        numberFilm: this.state.numberFilm + NUMBER_FILM
      });
    }
    public handleToRedirect(id: number): void {
      this.setState({
        redirectId: id
      });
    }
    public render(): ReactElement {
      if (this.state.redirectId) {
        return <Redirect to={routeToFilm(this.state.redirectId)} />;
      }
      return (
        <Component
          {...this.props}
          activeFilm={this.state.activeFilm}
          numberFilm={this.state.numberFilm}
          onMouseEnterCard={this.handleSetActiveFilm}
          onMouseLeaveCard={this.handleRemoveActiveFilm}
          onClickShowMore={this.handleShowMore}
          onClickToRedirect={this.handleToRedirect}
        />
      );
    }
    private _timeOutList: object;
  }
  return WithActiveFilm;
};

export default withActiveFilm;
