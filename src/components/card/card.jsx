import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article
        onMouseOver={() => this.props.onMouseOver(this.props.id)}
        onMouseLeave={() => this.props.onMouseLeave(this.props.id)}
        className="small-movie-card catalog__movies-card"
      >
        {!this.props.isPlay ? (
          <>
            <div className="small-movie-card__image">
              <img
                src={this.props.src}
                alt={this.props.title}
                width="280"
                height="175"
              />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link">{this.props.title}</a>
            </h3>
          </>
        ) : (
          <VideoPlayer poster={this.props.src} preview={this.props.preview} />
        )}
      </article>
    );
  }
}

Card.propTypes = {
  isPlay: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  genre: PropTypes.oneOf([`comedy`, `drama`]).isRequired,
  preview: PropTypes.string.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired
};
