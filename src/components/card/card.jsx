import React, {Fragment} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {OptionsVideoMin} from "../../mock/constants.js";
import {Link} from "react-router-dom";
import RoutePath from "../../routes.js";
import {LINK_STYLE} from "../../mock/constants.js";

const Card = ({
  onMouseLeaveCard,
  onMouseEnterCard,
  isActive,
  srcPreviewImage,
  title,
  preview,
  id
}) => {
  return (
    <Link
      to={`${RoutePath.FILM}/${id}`}
      onMouseOver={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
      className="small-movie-card catalog__movies-card"
      style={{color: LINK_STYLE, textDecoration: LINK_STYLE}}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          options={OptionsVideoMin}
          videoSrc={preview}
          posterSrc={srcPreviewImage}
          muted={true}
          isPlaying={isActive}
        />
        {!isActive ? (
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link">{title}</a>
          </h3>
        ) : (
          <Fragment />
        )}
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  srcPreviewImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired
};

export default Card;
