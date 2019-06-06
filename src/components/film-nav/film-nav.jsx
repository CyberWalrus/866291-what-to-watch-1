import React from "react";
import PropTypes from "prop-types";
import {FilmRoute} from "../../mock/constants.js";

const FilmDetails = ({changeFilmRoute, route}) => {
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
            onClick={changeFilmRoute}
            text={FilmRoute.OVERVIEW}
            className="movie-nav__link"
          >
            Overview
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
            onClick={changeFilmRoute}
            text={FilmRoute.DETAILS}
            className="movie-nav__link"
          >
            Details
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
            onClick={changeFilmRoute}
            text={FilmRoute.REVIEWS}
            className="movie-nav__link"
          >
            Reviews
          </a>
        </li>
      </ul>
    </nav>
  );
};
FilmDetails.propTypes = {
  route: PropTypes.string.isRequired,
  changeFilmRoute: PropTypes.func.isRequired
};
export default FilmDetails;
