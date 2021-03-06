import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath, {routeToFilm} from "../../routes";
import {getAuthorizationStatus, getUser} from "../../store/user/selectors";
import {User} from "../../type/data";
import {StateApp} from "../../type/reducer";

interface PropsInsert {
  isUserClass?: boolean;
  isShowIcon?: boolean;
  filmTitle?: string;
  filmId?: number;
  title?: string;
}
interface PropsState {
  isAuthorizationRequired: boolean;
  user: User;
}

type Props = PropsInsert & PropsState;

const Header: FunctionComponent<Props> = ({
  isAuthorizationRequired,
  isUserClass = false,
  isShowIcon = true,
  filmTitle = ``,
  filmId = 0,
  user,
  title
}: Props): ReactElement => {
  return (
    <header
      className={
        isUserClass
          ? `page-header user-page__head`
          : `page-header movie-card__head`
      }
    >
      <div className="logo">
        <Link className="logo__link" to={RoutePath.INDEX}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {title ? (
        <h1 className="page-title user-page__title">{title}</h1>
      ) : (
        <Fragment />
      )}
      {filmTitle && filmId ? (
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={routeToFilm(filmId)} className="breadcrumbs__link">
                {filmTitle}
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>
      ) : (
        <Fragment />
      )}
      {!isShowIcon ? (
        <Fragment />
      ) : (
        <div className="user-block">
          {!isAuthorizationRequired ? (
            <Link className="user-block__link" to={RoutePath.LOGIN}>
              Sign In
            </Link>
          ) : (
            <div className="user-block__avatar">
              <Link to={RoutePath.MY_LIST}>
                <img
                  src={user && user.srcAvatar ? user.srcAvatar : ``}
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state),
    user: getUser(state)
  });

export {Header};

export default connect(mapStateToProps)(Header);
