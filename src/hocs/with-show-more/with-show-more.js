import React from "react";
import {NUMBER_FILM} from "../../mock/constants.js";

const withShowMore = (Component) => {
  class WithShowMore extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        numberFilm: NUMBER_FILM
      };

      this.onShowMoreClick = this.onShowMoreClick.bind(this);
    }
    onShowMoreClick() {
      this.setState({
        numberFilm: this.state.countFilm + NUMBER_FILM
      });
    }

    render() {
      return (
        <Component
          numberFilm={this.state.numberFilm}
          onShowMoreClick={this.onShowMoreClick}
        />
      );
    }
  }

  return WithShowMore;
};

export default withShowMore;
