import React, {Fragment} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {OptionsVideoMin} from "../../mock/constants.js";
import {Link} from "react-router-dom";
import {routeToFilm} from "../../routes.js";

const Card = ({
  onClickToRedirect,
  onMouseLeaveCard,
  onMouseEnterCard,
  isActive,
  srcPreviewImage,
  title,
  srcPreviewVideo,
  id
}) => {
  return (
    <article
      onClick={onClickToRedirect}
      onMouseOver={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          options={OptionsVideoMin}
          videoSrc={srcPreviewVideo}
          posterSrc={srcPreviewImage}
          muted={true}
          isPlaying={isActive}
        />
        {!isActive ? (
          <h3 className="small-movie-card__title">
            <Link to={routeToFilm(id)} className="small-movie-card__link">
              {title}
            </Link>
          </h3>
        ) : (
          <Fragment />
        )}
      </div>
    </article>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  srcPreviewImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  srcPreviewVideo: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onClickToRedirect: PropTypes.func.isRequired
};

export default Card;
