import * as React from "react";
import {ReactElement, FunctionComponent} from "react";
import {FilmRoute} from "../../constants";

interface Props {
  route: string;
  onChangeFilmRoute: (value: FilmRoute) => void;
}

const FilmNav: FunctionComponent<Props> = ({onChangeFilmRoute, route}: Props): ReactElement => {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {Object.keys(FilmRoute).map((key, i): ReactElement => (
          <li
            key={i}
            className={
              route === FilmRoute[key]
                ? `movie-nav__item movie-nav__item--active`
                : `movie-nav__item`
            }
          >
            <a
              onClick={(): void => onChangeFilmRoute(FilmRoute[key])}
              className="movie-nav__link"
            >
              {FilmRoute[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FilmNav;
