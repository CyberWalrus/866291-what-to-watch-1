import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath from "../../routes.js";
import {getAuthorizationStatus, getUser} from "../../store/user/selectors.js";

const Header = ({
  isAuthorizationRequired,
  isUserClass = false,
  isShowIcon = true,
  filmTitle = ``,
  filmId = 0,
  user,
  title
}) => {
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
              <Link
                to={RoutePath.FILM.replace(`:id`, filmId)}
                className="breadcrumbs__link"
              >
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
                  src={user.srcAvatar}
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

Header.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  isUserClass: PropTypes.bool,
  isShowIcon: PropTypes.bool,
  filmTitle: PropTypes.string,
  filmId: PropTypes.number,
  title: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    srcAvatar: PropTypes.string
  }).isRequired
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state),
    user: getUser(state)
  });

export {Header};

export default connect(mapStateToProps)(Header);
