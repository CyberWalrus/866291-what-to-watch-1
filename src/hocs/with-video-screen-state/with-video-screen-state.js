import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getPlayFilmId} from "../../store/filter/selectors.js";
import {ActionCreator} from "../../store/filter/filter.js";
import {BodyOverflow, PADDING_VIDEO} from "../../constants.js";

const _timeConvert = (num) => {
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60);
  return `${minutes}:${seconds}`;
};
const withVideoScreenState = (Component) => {
  class WithVideoScreenState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        isPlaying: false,
        filmId: 0,
        togglerValue: 0,
        time: `00:00`,
        progressValue: 0,
        progressRef: undefined,
        videoRef: undefined
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleChangePlay = this.handleChangePlay.bind(this);
      this.handleSendVideoRef = this.handleSendVideoRef.bind(this);
      this.handleSendProgressRef = this.handleSendProgressRef.bind(this);
      this.handleFullScreen = this.handleFullScreen.bind(this);
      this.handlePointerDown = this.handlePointerDown.bind(this);
      this._handlePointerUp = this._handlePointerUp.bind(this);
      this._handlePointerMove = this._handlePointerMove.bind(this);
    }
    componentDidUpdate() {
      if (this.props.playFilmId) {
        this.setState({
          isOpen: true,
          filmId: this.props.playFilmId,
          isPlaying: false,
          togglerValue: 0,
          time: `00:00`,
          progressValue: 0,
          progressRef: undefined,
          videoRef: undefined
        });
        document.body.style.overflow = BodyOverflow.HIDDEN;
        this.props.onResetPlayFilmId();
      }
    }
    handleSendVideoRef(ref) {
      const video = ref;
      video.onloadedmetadata = () => {
        video.ontimeupdate = () => {
          const value = (100 / video.duration) * video.currentTime;

          this.setState({
            progressValue: value
          });
        };
        this.setState({
          videoRef: video,
          time: _timeConvert(video.duration)
        });
      };
    }

    handleSendProgressRef(ref) {
      this.setState({
        progressRef: ref
      });
    }
    handleClose() {
      this.setState({
        isOpen: false
      });
      document.body.style.overflow = BodyOverflow.VISIBLE;
    }
    handleChangePlay() {
      const video = this.state.videoRef;
      if (video) {
        if (this.state.isPlaying === false) {
          video.play();
          this.setState({
            isPlaying: true
          });
        } else {
          video.pause();
          this.setState({
            isPlaying: false
          });
        }
      }
    }
    handleFullScreen() {
      const video = this.state.videoRef;
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      }
    }
    handlePointerDown(event) {
      const video = this.state.videoRef;
      if (video) {
        window.addEventListener(`pointerup`, this._handlePointerUp);
        window.addEventListener(`pointermove`, this._handlePointerMove);
        this.setState({
          widthProgress: event.target
        });
      }
    }
    _handlePointerUp() {
      window.removeEventListener(`pointerup`, this._handlePointerUp);
      window.removeEventListener(`pointermove`, this._handlePointerMove);
    }
    _handlePointerMove(event) {
      const video = this.state.videoRef;
      let progressValue =
        (100 / this.state.progressRef.clientWidth) *
        (event.clientX - PADDING_VIDEO);
      if (progressValue >= 100) {
        progressValue = 100;
      }
      const time = video.duration * (progressValue / 100);
      video.currentTime = time;
      this.setState({
        progressValue
      });
    }
    render() {
      if (this.state.isOpen) {
        return (
          <Component
            time={this.state.time}
            isPlaying={this.state.isPlaying}
            filmId={this.state.filmId}
            progressValue={this.state.progressValue}
            onClickClose={this.handleClose}
            onChangePlay={this.handleChangePlay}
            onClickFullScreen={this.handleFullScreen}
            onMouseTogglerDown={this.handlePointerDown}
            onSendVideoRef={this.handleSendVideoRef}
            onSendProgressRef={this.handleSendProgressRef}
          />
        );
      }
      return <Fragment />;
    }
  }

  WithVideoScreenState.propTypes = {
    playFilmId: PropTypes.number.isRequired,
    onResetPlayFilmId: PropTypes.func.isRequired
  };
  return WithVideoScreenState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    playFilmId: getPlayFilmId(state)
  });
const mapDispatchToProps = (dispatch) => ({
  onResetPlayFilmId: () => dispatch(ActionCreator.resetPlayFilmId())
});
export {withVideoScreenState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withVideoScreenState
);
