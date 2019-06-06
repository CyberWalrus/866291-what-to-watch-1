import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

export default class Card extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article
        onMouseEnter={() => this.props.onMouseEnter(this.props.id)}
        onMouseOver={this.props.onCardMouseOver}
        onMouseLeave={this.props.onCardMouseLeave}
        className="small-movie-card catalog__movies-card"
      >
        {!this.props.isPlay ? (
          <>
            <div className="small-movie-card__image">
              <img
                src={this.props.srcPreviewImage}
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
          <VideoPlayer poster={this.props.srcPreviewImage} preview={this.props.preview} />
        )}
      </article>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  srcPreviewImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlay: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onCardMouseOver: PropTypes.func,
  onCardMouseLeave: PropTypes.func,
};
