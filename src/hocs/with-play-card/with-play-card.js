import React from "react";
import PropTypes from "prop-types";

const withPlayCard = (Component) => {
  class WithPlayCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.timeoutFunc = null;

      this.state = {
        isPlay: false
      };

      this.onCardMouseOver = this.onCardMouseOver.bind(this);
      this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
    }
    onCardMouseOver() {
      const timeoutMs = 1000;

      this.timeoutFunc = setTimeout(() => {
        this.setState({
          isPlay: true
        });
      }, timeoutMs);
    }
    onCardMouseLeave() {
      clearTimeout(this.timeoutFunc);
      this.setState({
        isPlay: false
      });
    }

    render() {
      return (
        <Component
          id={this.props.id}
          genre={this.props.genre}
          title={this.props.title}
          src={this.props.src}
          preview={this.props.preview}
          isPlay={this.state.isPlay}
          onMouseEnter={this.onMouseEnter}
          onCardMouseOver={this.onCardMouseOver}
          onCardMouseLeave={this.onCardMouseLeave}
        />
      );
    }
  }

  WithPlayCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([
      `comedy`,
      `crime`,
      `documentary`,
      `drama`,
      `horror`,
      `family`,
      `romance`,
      `sci-fi`,
      `thriller`
    ]).isRequired,
    preview: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func
  };

  return WithPlayCard;
};

export default withPlayCard;
