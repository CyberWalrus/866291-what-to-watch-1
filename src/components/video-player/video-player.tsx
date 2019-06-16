import * as React from "react";
import {PureComponent} from "react";

interface Props {
  videoSrc: string,
  posterSrc: string,
  options: Option
  isPlaying: boolean
  onSendVideoRef?: (value: any) => void,
}

interface Option {
  width: string,
  height: string,
  isMuted: boolean,
  isLoop: boolean
  isControls: boolean
}
class VideoPlayer extends PureComponent<Props, null> {
  private videoRef: any;
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.onSendVideoRef) {
      this.props.onSendVideoRef(this.videoRef.current);
    }
  }
  componentDidUpdate() {
    if (!this.props.onSendVideoRef) {
      const video = this.videoRef.current;
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }
  render() {
    const {videoSrc, posterSrc, options} = this.props;
    const {
      width,
      height,
      isMuted = true,
      isLoop = true,
      isControls = false
    } = options;
    return (
      <video
        ref={this.videoRef}
        src={videoSrc}
        poster={posterSrc}
        width={width}
        height={height}
        loop={isLoop}
        muted={isMuted}
        controls={isControls}
        className={`player__video`}
      />
    );
  }
}

export default VideoPlayer;
