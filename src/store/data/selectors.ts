import NameSpace from "./../name-spaces";
import {GENRE_DEFOULT, NUMBER_FILM, NUMBER_FILM_GENRE} from "../../constants";
import {getGenreSelected} from "../filter/selectors";
import {StateApp} from "../../type/reducer";
import {Film, Review} from "../../type/data";

const NAME_SPACE = NameSpace.DATA;

const getFilms = (
  state: StateApp,
  number: number = NUMBER_FILM,
  genreFilm: string,
  filmId: number
): Film[] => {
  let films = [];
  let genre = getGenreSelected(state);
  if (genreFilm) {
    genre = genreFilm;
    number = NUMBER_FILM_GENRE;
  }
  if (genre === GENRE_DEFOULT) {
    films = state[NAME_SPACE].films.slice();
  } else {
    state[NAME_SPACE].films.map((item): void => {
      if (item.genre === genre && item.id !== filmId) {
        films.push(item);
      }
    });
  }
  if (films.length > number) {
    films.length = number;
  }
  return films;
};
const getFavorites = (
  state: StateApp,
  number: number = NUMBER_FILM
): Film[] => {
  const favorites = state[NAME_SPACE].favorites.slice();
  if (favorites.length > number) {
    favorites.length = number;
  }
  return favorites;
};

const getReviews = (state: StateApp): Review[] => {
  return state[NAME_SPACE].reviews.slice();
};

const getFilm = (state: StateApp, id: number): Film => {
  const film = state[NAME_SPACE].films.find((item): boolean => item.id === id);
  return film;
};

const getGeners = (state: StateApp): string[] => {
  return state[NAME_SPACE].genres;
};

const getReviewMessage = (state: StateApp): string => {
  return state[NAME_SPACE].reviewMessage;
};
const getActive = (state: StateApp): boolean => {
  return state[NAME_SPACE].isActive;
};

export {
  getFilms,
  getFilm,
  getGeners,
  getFavorites,
  getReviews,
  getReviewMessage,
  getActive
};
