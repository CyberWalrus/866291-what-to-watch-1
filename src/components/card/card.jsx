import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.timeoutFunc = null;

    this.state = {
      isPlay: false
    };

    this.onCardMouseOver = this.onCardMouseOver.bind(this);
    this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
  }
  onCardMouseOver() {
    const timeoutMs = 1000;

    this.timeoutFunc = setTimeout(() => {
      this.setState({
        isPlay: true
      });
    }, timeoutMs);
  }
  onCardMouseLeave() {
    clearTimeout(this.timeoutFunc);
    this.setState({
      isPlay: false
    });
  }
  render() {
    return (
      <article
        onMouseEnter={() => this.props.onMouseEnter(this.props.id)}
        onMouseOver={this.onCardMouseOver}
        onMouseLeave={this.onCardMouseLeave}
        className="small-movie-card catalog__movies-card"
      >
        {!this.state.isPlay ? (
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  genre: PropTypes.oneOf([`comedy`, `drama`]).isRequired,
  preview: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func
};
