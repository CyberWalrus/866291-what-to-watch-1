import * as React from "react";
import {PureComponent, Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath, {routeToReview} from "../../routes.js";
import {getAuthorizationStatus} from "../../store/user/selectors.js";
import {Operation} from "../../store/data/data.js";
import {ActionCreator} from "../../store/filter/filter.js";
import {FavoriteStatus} from "../../constants.js";

interface Props {
  id: number,
  isFavorite: boolean,
  isAuthorizationRequired: boolean,
  isShowReview: boolean,
  onSendFavorite: (status: number, id: number) => void,
  onVideoScreenOpen: (id: number) => void,
}
class FilmButtonDiv extends PureComponent<Props, null> {
  constructor(props) {
    super(props);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
    this._handleClickPlay = this._handleClickPlay.bind(this);
  }
  _handleClickPlay() {
    const {id} = this.props;
    this.props.onVideoScreenOpen(id);
  }
  _handleClickFavorite() {
    const {id, isFavorite} = this.props;
    const status = isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD;
    this.props.onSendFavorite(status, id);
  }
  render() {
    const {id, isFavorite, isAuthorizationRequired, isShowReview} = this.props;
    return (
      <div className="movie-card__buttons">
        <button
          className="btn btn--play movie-card__button"
          type="button"
          onClick={this._handleClickPlay}
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
            onClick={this._handleClickFavorite}
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
            to={routeToReview(id)}
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

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });
const mapDispatchToProps = (dispatch) => ({
  onSendFavorite: (status, filmId) =>
    dispatch(Operation.sendFavorite(status, filmId)),
  onVideoScreenOpen: (filmId) => dispatch(ActionCreator.setPlayFilmId(filmId))
});

export {FilmButtonDiv};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmButtonDiv);
