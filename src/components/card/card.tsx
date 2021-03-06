import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";
import VideoPlayer from "../video-player/video-player";
import {OptionsVideoMin} from "../../constants";
import {Link} from "react-router-dom";
import {routeToFilm} from "../../routes";

interface Props {
  id: number;
  title: string;
  srcPreviewImage: string;
  srcPreviewVideo: string;
  isActive: boolean;
  onClickToRedirect: () => void;
  onMouseLeaveCard: () => void;
  onMouseEnterCard: () => void;
}

const Card: FunctionComponent<Props> = ({
  id,
  title,
  srcPreviewImage,
  srcPreviewVideo,
  isActive,
  onClickToRedirect,
  onMouseLeaveCard,
  onMouseEnterCard
}: Props): ReactElement => {
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

export default Card;
