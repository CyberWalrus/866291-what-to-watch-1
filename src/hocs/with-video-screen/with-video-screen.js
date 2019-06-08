import React, {PureComponent} from "react";
import VideoScreen from "../../components/video-screen/video-screen.jsx";
import {BodyOverflow} from "../../mock/constants.js";

const withVideoScreen = (Component) => {
  class WithVideoScreen extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        isPlaying: false
      };
      this.onVideoScreenOpen = this.onVideoScreenOpen.bind(this);
      this.onVideoScreenClose = this.onVideoScreenClose.bind(this);
      this.onPlayChange = this.onPlayChange.bind(this);
    }

    onVideoScreenOpen() {
      this.setState({
        isOpen: true
      });
      document.body.style.overflow = BodyOverflow.HIDDEN;
    }

    onVideoScreenClose() {
      this.setState({
        isOpen: false
      });
      document.body.style.overflow = BodyOverflow.VISIBLE;
    }
    onPlayChange() {
      this.setState({
        isPlaying: !this.state.isPlaying
      });
    }

    render() {
      if (this.state.isOpen) {
        return (
          <VideoScreen
            onVideoScreenClose={this.onVideoScreenClose}
            onPlayChange={this.onPlayChange}
            isPlaying={this.state.isPlaying}
          />
        );
      }
      return (
        <Component {...this.props} onVideoScreenOpen={this.onVideoScreenOpen} />
      );
    }
  }

  WithVideoScreen.propTypes = {};
  return WithVideoScreen;
};

export default withVideoScreen;
