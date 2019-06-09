import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath from "../../routes.js";
import {getAuthorizationStatus} from "../../store/user/selectors.js";
import {Operation} from "../../store/data/data.js";
import {ActionCreator} from "../../store/filter/filter.js";
import {FavoriteStatus} from "../../mock/constants.js";

class FilmButtonDiv extends PureComponent {
  constructor(props) {
    super(props);
    this._handleOnClickFavorite = this._handleOnClickFavorite.bind(this);
    this._handleOnClickPlay = this._handleOnClickPlay.bind(this);
  }
  _handleOnClickPlay() {
    const {id} = this.props;
    this.props.onVideoScreenOpen(id);
  }
  _handleOnClickFavorite() {
    const {id, isFavorite} = this.props;
    const status = isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD;
    this.props.sendFavorite(status, id);
  }
  render() {
    const {
      id,
      isFavorite,
      isAuthorizationRequired,
      isShowReview
    } = this.props;
    return (
      <div className="movie-card__buttons">
        <button
          className="btn btn--play movie-card__button"
          type="button"
          onClick={this._handleOnClickPlay}
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s" />
          </svg>
          <span>Play</span>
        </button>
        {isAuthorizationRequired ? (
          <button
            className="btn btn--list movie-card__button"
            type="button"
            onClick={this._handleOnClickFavorite}
          >
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref={isFavorite ? `#remove` : `#add`} />
            </svg>
            <span>My list</span>
          </button>
        ) : (
          <Link
            to={RoutePath.LOGIN}
            className="btn btn--list movie-card__button"
          >
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref={`#add`} />
            </svg>
            <span>My list</span>
          </Link>
        )}

        {isShowReview ? (
          <Link
            to={RoutePath.ADD_REVIEW.replace(`:id`, id)}
            className="btn movie-card__button"
          >
            Add review
          </Link>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
}
FilmButtonDiv.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  sendFavorite: PropTypes.func.isRequired,
  onVideoScreenOpen: PropTypes.func.isRequired,
  isShowReview: PropTypes.bool
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });
const mapDispatchToProps = (dispatch) => ({
  sendFavorite: (status, filmId) =>
    dispatch(Operation.sendFavorite(status, filmId)),
  onVideoScreenOpen: (filmId) =>
    dispatch(ActionCreator.setPlayFilmId(filmId))
});
export {FilmButtonDiv};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmButtonDiv);
