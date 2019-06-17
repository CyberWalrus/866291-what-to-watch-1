import * as React from "react";
import {PureComponent, RefObject, ReactElement} from "react";

interface Props {
  videoSrc: string;
  posterSrc: string;
  options: Option;
  isPlaying: boolean;
  onSendVideoRef?: (value: HTMLVideoElement) => void;
}

interface Option {
  width: string;
  height: string;
  isMuted: boolean;
  isLoop: boolean;
  isControls: boolean;
}
class VideoPlayer extends PureComponent<Props, null> {
  public videoRef: RefObject<HTMLVideoElement>;
  public constructor(props: Props) {
    super(props);

    this.videoRef = React.createRef();
  }
  public componentDidMount(): void {
    if (this.props.onSendVideoRef) {
      this.props.onSendVideoRef(this.videoRef.current);
    }
  }
  public componentDidUpdate(): void {
    if (!this.props.onSendVideoRef) {
      const video = this.videoRef.current;
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }
  public render(): ReactElement {
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
