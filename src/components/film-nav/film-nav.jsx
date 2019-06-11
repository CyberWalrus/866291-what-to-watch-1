import React from "react";
import PropTypes from "prop-types";
import {FilmRoute} from "../../constants.js";

const FilmNav = ({onChangeFilmRoute, route}) => {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li
          className={
            route === FilmRoute.OVERVIEW
              ? `movie-nav__item movie-nav__item--active`
              : `movie-nav__item`
          }
        >
          <a
            onClick={onChangeFilmRoute}
            text={FilmRoute.OVERVIEW}
            className="movie-nav__link"
          >
            {FilmRoute.OVERVIEW}
          </a>
        </li>
        <li
          className={
            route === FilmRoute.DETAILS
              ? `movie-nav__item movie-nav__item--active`
              : `movie-nav__item`
          }
        >
          <a
            onClick={onChangeFilmRoute}
            text={FilmRoute.DETAILS}
            className="movie-nav__link"
          >
            {FilmRoute.DETAILS}
          </a>
        </li>
        <li
          className={
            route === FilmRoute.REVIEWS
              ? `movie-nav__item movie-nav__item--active`
              : `movie-nav__item`
          }
        >
          <a
            onClick={onChangeFilmRoute}
            text={FilmRoute.REVIEWS}
            className="movie-nav__link"
          >
            {FilmRoute.REVIEWS}
          </a>
        </li>
      </ul>
    </nav>
  );
};
FilmNav.propTypes = {
  route: PropTypes.string.isRequired,
  onChangeFilmRoute: PropTypes.func.isRequired
};
export default FilmNav;
