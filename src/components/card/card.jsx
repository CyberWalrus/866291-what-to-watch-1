import React from "react";
import PropTypes from "prop-types";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article
        onMouseEnter={() => this.props.onMouseEnter(this.props.id)}
        className="small-movie-card catalog__movies-card"
      >
        <button
          onClick={() => this.props.onClick(this.props.id)}
          className="small-movie-card__play-btn"
          type="button"
        >
          Play
        </button>
        <div className="small-movie-card__image">
          <img src={this.props.src} alt={this.props.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link">{this.props.title}</a>
        </h3>
      </article>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
};
