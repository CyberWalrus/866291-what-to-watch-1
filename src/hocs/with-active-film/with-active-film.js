import React, {PureComponent} from "react";
import {NUMBER_FILM} from "../../constants.js";
import {Redirect} from "react-router-dom";
import {routeToFilm} from "../../routes.js";

const withActiveFilm = (Component) => {
  class WithActiveFilm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeFilm: 0,
        numberFilm: NUMBER_FILM,
        redirectId: 0
      };
      this.timeOutList = {};
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
      const id = this.state.activeFilm;
      clearTimeout(this.timeOutList[id]);
    }

    handleSetActiveFilm(id) {
      this.timeOutList[id] = setTimeout(() => {
        this.setState({
          activeFilm: id
        });
        clearTimeout(this.timeOutList[id]);
        delete this.timeOutList[id];
      }, 1000);
    }

    handleRemoveActiveFilm(id) {
      clearTimeout(this.timeOutList[id]);
      delete this.timeOutList[id];
      this.setState({
        activeFilm: 0
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
