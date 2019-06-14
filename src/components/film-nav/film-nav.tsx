import * as React from "react";
import {FilmRoute} from "../../constants";

interface Props {
  route: string;
  onChangeFilmRoute: (value: string) => void;
}

const FilmNav = ({onChangeFilmRoute, route}: Props) => {
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
            onClick={() => onChangeFilmRoute(FilmRoute.OVERVIEW)}
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
            onClick={() => onChangeFilmRoute(FilmRoute.DETAILS)}
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
            onClick={() => onChangeFilmRoute(FilmRoute.REVIEWS)}
            className="movie-nav__link"
          >
            {FilmRoute.REVIEWS}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default FilmNav;
