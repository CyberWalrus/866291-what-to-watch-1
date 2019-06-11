import React, {PureComponent} from "react";
import {NUMBER_FILM, TIMEOUT_INTERVAL} from "../../constants.js";
import {Redirect} from "react-router-dom";
import {routeToFilm} from "../../routes.js";

const withActiveFilm = (Component) => {
  class WithActiveFilm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeFilm: 0,
        numberFilm: NUMBER_FILM,
        redirectId: 0,
        timeOutId: 0,
      };
      this._timeOutList = {};
      this.handleSetActiveFilm = this.handleSetActiveFilm.bind(this);
      this.handleRemoveActiveFilm = this.handleRemoveActiveFilm.bind(this);
      this.handleShowMore = this.handleShowMore.bind(this);
      this.handleToRedirect = this.handleToRedirect.bind(this);
    }
    componentDidUpdate() {
      if (this.state.redirectId) {
        this.setState({
          redirectId: 0
        });
      }
    }
    componentWillUnmount() {
      clearTimeout(this._timeOutList[this.state.timeOutId]);
    }

    handleSetActiveFilm(id) {
      this.setState({
        timeOutId: id
      });
      this._timeOutList[id] = setTimeout(() => {
        this.setState({
          activeFilm: id,
          timeOutId: 0
        });
        clearTimeout(this._timeOutList[id]);
        delete this._timeOutList[id];
      }, TIMEOUT_INTERVAL);
    }

    handleRemoveActiveFilm(id) {
      clearTimeout(this._timeOutList[id]);
      delete this._timeOutList[id];
      this.setState({
        activeFilm: 0,
        timeOutId: 0
      });
    }

    handleShowMore() {
      this.setState({
        numberFilm: this.state.countFilm + NUMBER_FILM
      });
    }
    handleToRedirect(id) {
      this.setState({
        redirectId: id
      });
    }
    render() {
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
  }
  return WithActiveFilm;
};

export default withActiveFilm;
