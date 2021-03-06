import * as React from "react";
import {PureComponent, Fragment, ReactElement} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath, {routeToReview} from "../../routes";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {Operation} from "../../store/data/data";
import {ActionCreator} from "../../store/filter/filter";
import {FavoriteStatus} from "../../constants";
import {StateApp, ThunkDispatch} from "../../type/reducer";

interface PropsInsert {
  id: number;
  isFavorite?: boolean;
  isShowReview?: boolean;
}
interface PropsState {
  isAuthorizationRequired: boolean;
}
interface PropsDispatch {
  onSendFavorite: (status: number, id: number) => void;
  onVideoScreenOpen: (id: number) => void;
}
type Props = PropsInsert & PropsState & PropsDispatch;
class FilmButtonDiv extends PureComponent<Props, null> {
  public constructor(props: Props) {
    super(props);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
    this._handleClickPlay = this._handleClickPlay.bind(this);
  }
  public render(): ReactElement {
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
          <Link to={routeToReview(id)} className="btn movie-card__button">
            Add review
          </Link>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
  private _handleClickPlay(): void {
    const {id} = this.props;
    this.props.onVideoScreenOpen(id);
  }
  private _handleClickFavorite(): void {
    const {id, isFavorite} = this.props;
    const status = isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD;
    this.props.onSendFavorite(status, id);
  }
}

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });
const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onSendFavorite: (status: number, filmId: number): void => {
    dispatch(Operation.sendFavorite(status, filmId));
  },
  onVideoScreenOpen: (filmId: number): void => {
    dispatch(ActionCreator.setPlayFilmId(filmId));
  }
});

export {FilmButtonDiv};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmButtonDiv);
