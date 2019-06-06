import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import RoutePath from "../../routes.js";

const withPlayCard = (Component) => {
  class WithPlayCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.timeoutFunc = null;

      this.state = {
        isPlay: false,
        redirect: false
      };

      this.onCardMouseOver = this.onCardMouseOver.bind(this);
      this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
      this.onClickComponent = this.onClickComponent.bind(this);
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
    onClickComponent() {
      this.setState({
        redirect: true
      });
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={`${RoutePath.FILM}/${this.props.id}`} />;
      }
      return (
        <Component
          id={this.props.id}
          genre={this.props.genre}
          title={this.props.title}
          srcPreviewImage={this.props.srcPreviewImage}
          preview={this.props.preview}
          isPlay={this.state.isPlay}
          onCardMouseOver={this.onCardMouseOver}
          onCardMouseLeave={this.onCardMouseLeave}
          onClickComponent={this.onClickComponent}
        />
      );
    }
  }

  WithPlayCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    srcPreviewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  };

  return WithPlayCard;
};

export default withPlayCard;
