import React from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <video
        src={this.props.preview}
        poster={this.props.poster}
        style={{
          width: `100%`,
          height: `100%`
        }}
        muted
        autoPlay
      />
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired
};
