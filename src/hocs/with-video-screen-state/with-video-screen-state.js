import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getPlayFilmId} from "../../store/filter/selectors.js";
import {ActionCreator} from "../../store/filter/filter.js";
import {BodyOverflow} from "../../mock/constants.js";

const withVideoScreenState = (Component) => {
  class WithVideoScreenState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        filmId: 0,
        isPlaying: false
      };
      this.onVideoScreenClose = this.onVideoScreenClose.bind(this);
      this.onPlayChange = this.onPlayChange.bind(this);
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
    componentDidUpdate() {
      if (this.props.playFilmId) {
        this.setState({
          isOpen: true,
          filmId: this.props.playFilmId
        });
        document.body.style.overflow = BodyOverflow.HIDDEN;
        this.props.resetPlayFilmId();
      }
    }

    render() {
      if (this.state.isOpen) {
        return (
          <Component
            onVideoScreenClose={this.onVideoScreenClose}
            onPlayChange={this.onPlayChange}
            isPlaying={this.state.isPlaying}
            filmId={this.state.filmId}
          />
        );
      }
      return <Fragment />;
    }
  }

  WithVideoScreenState.propTypes = {
    playFilmId: PropTypes.number.isRequired,
    resetPlayFilmId: PropTypes.func.isRequired
  };
  return WithVideoScreenState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    playFilmId: getPlayFilmId(state)
  });
const mapDispatchToProps = (dispatch) => ({
  resetPlayFilmId: () => dispatch(ActionCreator.resetPlayFilmId())
});
export {withVideoScreenState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withVideoScreenState
);
