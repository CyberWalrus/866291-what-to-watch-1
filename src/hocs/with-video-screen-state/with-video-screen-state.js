import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getPlayFilmId} from "../../store/filter/selectors.js";
import {ActionCreator} from "../../store/filter/filter.js";
import {BodyOverflow} from "../../mock/constants.js";

const checkHeiht = (pointerPosition = 0, widthElement, padding = 25, video) => {
  let valueChange = (100 / widthElement) * (pointerPosition - padding);
  if (valueChange >= 100) {
    valueChange = 100;
  }
  const pointerReturn = valueChange;
  const time = video.duration * (valueChange / 100);
  // Update the video time
  video.currentTime = time;
  return pointerReturn;
};

const timeConvert = (num) => {
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
        filmId: 0,
        togglerValue: 0,
        time: 0,
        progressValue: 0,
        progressRef: undefined,
        isPlaying: false,
        videoRef: undefined
      };
      this.onVideoScreenClose = this.onVideoScreenClose.bind(this);
      this.onPlayChange = this.onPlayChange.bind(this);
      this.sendVideoRef = this.sendVideoRef.bind(this);
      this.sendProgressRef = this.sendProgressRef.bind(this);
      this.onFullScreen = this.onFullScreen.bind(this);
      this.divPointerDown = this.divPointerDown.bind(this);
      this.divPointerUp = this.divPointerUp.bind(this);
      this.divPointerMove = this.divPointerMove.bind(this);
    }
    componentDidUpdate() {
      if (this.props.playFilmId) {
        this.setState({
          isOpen: true,
          filmId: this.props.playFilmId
        });
        document.body.style.overflow = BodyOverflow.HIDDEN;
        this.props.resetPlayFilmId();
      }
    }
    divPointerDown(event) {
      window.addEventListener(`pointerup`, this.divPointerUp);
      window.addEventListener(`pointermove`, this.divPointerMove);
      this.setState({
        widthProgress: event.target
      });
    }
    divPointerUp() {
      window.removeEventListener(`pointerup`, this.divPointerUp);
      window.removeEventListener(`pointermove`, this.divPointerMove);
    }
    divPointerMove(event) {
      const pointerPosition = checkHeiht(
          event.clientX,
          this.state.progressRef.clientWidth,
          25,
          this.state.videoRef
      );
      this.setState({
        progressValue: pointerPosition
      });
    }
    onVideoScreenClose() {
      this.setState({
        isOpen: false
      });
      document.body.style.overflow = BodyOverflow.VISIBLE;
    }
    onPlayChange() {
      const video = this.state.videoRef;
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
    onFullScreen() {
      const video = this.state.videoRef;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    }
    sendVideoRef(ref) {
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
          time: timeConvert(video.duration)
        });
      };
    }

    sendProgressRef(ref) {
      this.setState({
        progressRef: ref
      });
    }
    render() {
      if (this.state.isOpen) {
        return (
          <Component
            time={this.state.time}
            onVideoScreenClose={this.onVideoScreenClose}
            onPlayChange={this.onPlayChange}
            isPlaying={this.state.isPlaying}
            filmId={this.state.filmId}
            sendVideoRef={this.sendVideoRef}
            onFullScreen={this.onFullScreen}
            video={this.state.videoRef}
            progressValue={this.state.progressValue}
            divPointerDown={this.divPointerDown}
            divPointerUp={this.divPointerUp}
            sendProgressRef={this.sendProgressRef}
          />
        );
      }
      return <Fragment />;
    }
  }

  WithVideoScreenState.propTypes = {
    playFilmId: PropTypes.number.isRequired,
    resetPlayFilmId: PropTypes.func.isRequired
  };
  return WithVideoScreenState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    playFilmId: getPlayFilmId(state)
  });
const mapDispatchToProps = (dispatch) => ({
  resetPlayFilmId: () => dispatch(ActionCreator.resetPlayFilmId())
});
export {withVideoScreenState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withVideoScreenState
);
