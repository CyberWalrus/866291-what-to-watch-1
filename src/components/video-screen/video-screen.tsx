import * as React from "react";
import {PureComponent, Fragment, RefObject, ReactElement} from "react";
import VideoPlayer from "../video-player/video-player";
import {OptionsVideoFull, VideoScreenStyle} from "../../constants";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors";
import {Film} from "../../type/data";
import {StateApp} from "../../type/reducer";

interface PropsInsert {
  filmId: number;
  time: string;
  progressValue: number;
  isPlaying: boolean;
  onChangePlay: () => void;
  onClickClose: () => void;
  onClickFullScreen: () => void;
  onMouseTogglerDown: () => void;
  onSendVideoRef: () => void;
  onSendProgressRef: (value: any) => void;
}
interface PropsState {
  film: Film;
}
type Props = PropsInsert & PropsState;
class VideoScreen extends PureComponent<Props, null> {
  public progressRef: RefObject<HTMLProgressElement>;
  public constructor(props: Props) {
    super(props);

    this.progressRef = React.createRef();
  }
  public componentDidMount(): void {
    if (this.props.onSendProgressRef) {
      this.props.onSendProgressRef(this.progressRef.current);
    }
  }
  public render(): ReactElement {
    const {
      isPlaying,
      film,
      time,
      progressValue,
      onClickClose,
      onSendVideoRef,
      onChangePlay,
      onClickFullScreen,
      onMouseTogglerDown
    } = this.props;
    return (
      <Fragment>
        <div
          className="player"
          style={Object.assign({}, VideoScreenStyle, {
            background: `url(${film.srcBgImage}) no-repeat center center fixed`
          })}
        >
          <VideoPlayer
            options={OptionsVideoFull}
            videoSrc={film.srcVideo}
            posterSrc={film.srcBgImage}
            onSendVideoRef={onSendVideoRef}
            isPlaying={isPlaying}
          />

          <button type="button" className="player__exit" onClick={onClickClose}>
            Exit
          </button>
          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress
                  ref={this.progressRef}
                  className="player__progress"
                  value={progressValue}
                  max="100"
                />
                <div
                  className="player__toggler"
                  onMouseDown={onMouseTogglerDown}
                  style={{left: `${progressValue}%`}}
                >
                  Toggler
                </div>
              </div>
              <div className="player__time-value">{time}</div>
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

              <div className="player__name">{film.title}</div>

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

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.filmId)
  });

export {VideoScreen};

export default connect<Props, {}, {}, StateApp>(mapStateToProps)(VideoScreen);
