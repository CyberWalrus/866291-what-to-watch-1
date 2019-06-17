import * as React from "react";
import {PureComponent, Fragment, ReactElement, ComponentClass} from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getPlayFilmId} from "../../store/filter/selectors";
import {ActionCreator} from "../../store/filter/filter";
import {BodyOverflow, PADDING_VIDEO} from "../../constants";
import {StateApp, ThunkDispatch} from "../../type/reducer";

interface PropsState {
  playFilmId: number;
}
interface PropsDispatch {
  onResetPlayFilmId: () => void;
}
type Props = PropsState & PropsDispatch;

interface State {
  isOpen: boolean;
  isPlaying: boolean;
  filmId: number;
  togglerValue: number;
  time: string;
  progressValue: number;
  progressRef: HTMLProgressElement;
  videoRef: HTMLVideoElement;
}

const _timeConvert = (num: number): string => {
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60);
  return `${minutes}:${seconds}`;
};
const withVideoScreenState = (Component: any): ComponentClass<Props, State> => {
  class WithVideoScreenState extends PureComponent<Props, State> {
    public constructor(props: Props) {
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
    public componentDidUpdate(): void {
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
    public handleSendVideoRef(ref: HTMLVideoElement): void {
      const video = ref;
      video.onloadedmetadata = (): void => {
        video.ontimeupdate = (): void => {
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

    public handleSendProgressRef(ref: HTMLProgressElement): void {
      this.setState({
        progressRef: ref
      });
    }
    public handleClose(): void {
      this.setState({
        isOpen: false
      });
      document.body.style.overflow = BodyOverflow.VISIBLE;
    }
    public handleChangePlay(): void {
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
    public handleFullScreen(): void {
      const video = this.state.videoRef;
      if (video && video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
    public handlePointerDown(): void {
      const video = this.state.videoRef;
      if (video) {
        window.addEventListener(`pointerup`, this._handlePointerUp);
        window.addEventListener(`pointermove`, this._handlePointerMove);
      }
    }
    public render(): ReactElement {
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

    private _handlePointerUp(): void {
      window.removeEventListener(`pointerup`, this._handlePointerUp);
      window.removeEventListener(`pointermove`, this._handlePointerMove);
    }
    private _handlePointerMove(event): void {
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
  }

  return WithVideoScreenState;
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    playFilmId: getPlayFilmId(state)
  });
const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onResetPlayFilmId: (): void => {
    dispatch(ActionCreator.resetPlayFilmId());
  }
});
export {withVideoScreenState};

export default compose(
  connect<Props, PropsDispatch, {}, StateApp>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withVideoScreenState
);
