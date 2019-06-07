import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isPlaying: false
    };
  }
  componentDidUpdate() {
    const video = this._videoRef.current;

    this._updateIsPlayingFromProps();

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
  render() {
    const {videoSrc, posterSrc, options} = this.props;
    const {width, height, isMuted = true, isLoop = true, isControls = false} = options;
    return (
      <video
        ref={this._videoRef}
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
  _updateIsPlayingFromProps() {
    const {isPlaying} = this.props;

    this.setState({
      isPlaying
    });
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
  isPlaying: PropTypes.bool
};

export default VideoPlayer;
