import React, {Fragment} from "react";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {OptionsVideoFull} from "../../mock/constants.js";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";

const VideoScreen = ({onVideoScreenClose, isPlaying, film}) => {
  return (
    <Fragment>
      <HiddenIcon />
      <div
        className="player"
        style={{
          zIndex: `100`,
          background: `url(${film.srcBgImage}) no-repeat center center fixed`,
          backgroundSize: `cover`
        }}
      >
        <VideoPlayer
          options={OptionsVideoFull}
          videoSrc={film.srcVideo}
          posterSrc={film.srcBgImage}
          isPlaying={isPlaying}
        />

        <button
          type="button"
          className="player__exit"
          onClick={onVideoScreenClose}
        >
          Exit
        </button>
      </div>
    </Fragment>
  );
};
VideoScreen.propTypes = {
  filmId: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayChange: PropTypes.func.isRequired,
  onVideoScreenClose: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    srcPreviewImage: PropTypes.string.isRequired,
    srcPosterImage: PropTypes.string.isRequired,
    srcBgImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    srcVideo: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    scoresCount: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired
  })
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.filmId)
  });

export {VideoScreen};

export default connect(mapStateToProps)(VideoScreen);
