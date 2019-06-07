import React, {PureComponent} from "react";
import {Redirect} from "react-router-dom";
import {NUMBER_FILM} from "../../mock/constants.js";
import RoutePath from "../../routes.js";

const withActiveFilm = (Component) => {
  class WithActiveFilm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeFilm: 0,
        numberFilm: NUMBER_FILM,
        redirect: false,
        redirectId: 0
      };
      this.timeOutList = {};
      this.setActiveFilm = this.setActiveFilm.bind(this);
      this.removeActiveFilm = this.removeActiveFilm.bind(this);
      this.onShowMoreClick = this.onShowMoreClick.bind(this);
      this.onClickComponent = this.onClickComponent.bind(this);
    }

    setActiveFilm(id) {
      this.timeOutList[id] = setTimeout(() => {
        this.setState({
          activeFilm: id
        });
        clearTimeout(this.timeOutList[id]);
        delete this.timeOutList[id];
      }, 1000);
    }

    removeActiveFilm(id) {
      clearTimeout(this.timeOutList[id]);
      delete this.timeOutList[id];
      this.setState({
        activeFilm: 0
      });
    }

    onShowMoreClick() {
      this.setState({
        numberFilm: this.state.countFilm + NUMBER_FILM
      });
    }
    onClickComponent(id) {
      this.setState({
        redirect: true,
        redirectId: id
      });
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={`${RoutePath.FILM}/${this.state.redirectId}`} />;
      }
      return (
        <Component
          {...this.props}
          activeFilm={this.state.activeFilm}
          setActiveFilm={this.setActiveFilm}
          removeActiveFilm={this.removeActiveFilm}
          numberFilm={this.state.numberFilm}
          onShowMoreClick={this.onShowMoreClick}
          onClickComponent={this.onClickComponent}
        />
      );
    }
  }

  WithActiveFilm.propTypes = {};
  return WithActiveFilm;
};

export default withActiveFilm;
