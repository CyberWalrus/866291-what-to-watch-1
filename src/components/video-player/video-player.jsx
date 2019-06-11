import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
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

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string,
  options: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    isMuted: PropTypes.bool,
    isLoop: PropTypes.bool,
    isControls: PropTypes.bool
  }).isRequired,
  isPlaying: PropTypes.bool,
  onSendVideoRef: PropTypes.func,
};

export default VideoPlayer;
