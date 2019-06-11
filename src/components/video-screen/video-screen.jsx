import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {OptionsVideoFull} from "../../mock/constants.js";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";

class VideoScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._progressRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.onSendProgressRef) {
      this.props.onSendProgressRef(this._progressRef.current);
    }
  }
  render() {
    const {
      isPlaying,
      film,
      time,
      progressValue,
      onClickClose,
      onSendVideoRef,
      onChangePlay,
      onClickFullScreen,
      onMouseTogglerDown,
      onMouseTogglerUp
    } = this.props;
    return (
      <Fragment>
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
            onSendVideoRef={onSendVideoRef}
            isPlaying={isPlaying}
          />

          <button
            type="button"
            className="player__exit"
            onClick={onClickClose}
          >
            Exit
          </button>
          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress
                  ref={this._progressRef}
                  className="player__progress"
                  value={progressValue}
                  max="100"
                />
                <div
                  className="player__toggler"
                  onMouseDown={onMouseTogglerDown}
                  onMouseUp={onMouseTogglerUp}
                  style={{left: `${progressValue}%`}}
                >
                  Toggler
                </div>
              </div>
              <div className="player__time-value">{time ? time : `0`}</div>
            </div>

            <div className="player__controls-row">
              {isPlaying ? (
                <button
                  type="button"
                  className="player__play"
                  onClick={onChangePlay}
                >
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause" />
                  </svg>
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="player__play"
                  onClick={onChangePlay}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
              )}

              <div className="player__name">Transpotting</div>

              <button
                type="button"
                className="player__full-screen"
                onClick={onClickFullScreen}
              >
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen" />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
VideoScreen.propTypes = {
  filmId: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  progressValue: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onChangePlay: PropTypes.func.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickFullScreen: PropTypes.func.isRequired,
  onMouseTogglerDown: PropTypes.func,
  onMouseTogglerUp: PropTypes.func,
  onSendVideoRef: PropTypes.func.isRequired,
  onSendProgressRef: PropTypes.func.isRequired,
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
    runTime: PropTypes.string.isRequired
  })
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.filmId)
  });

export {VideoScreen};

export default connect(mapStateToProps)(VideoScreen);
