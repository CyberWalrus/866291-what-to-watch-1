import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import RoutePath from "../../routes.js";
import {getAuthorizationStatus} from "../../store/user/selectors.js";

const Header = ({isAuthorizationRequired, isSignin}) => {
  return (
    <header
      className={
        isSignin
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

      {isSignin ? (
        <h1 className="page-title user-page__title">Sign in</h1>
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
                  src="img/avatar.jpg"
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
  isSignin: PropTypes.bool
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

export {Header};

export default connect(mapStateToProps)(Header);
