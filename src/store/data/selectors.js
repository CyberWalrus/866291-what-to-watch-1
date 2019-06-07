import NameSpace from "./../name-spaces.js";
import {GENRE_DEFOULT, NUMBER_FILM, NUMBER_FILM_GENRE} from "../../mock/constants.js";
import {getGenreSelected} from "../filter/selectors.js";

const NAME_SPACE = NameSpace.DATA;

const getFilms = (state, number = NUMBER_FILM, genreFilm, filmId) => {
  let films = [];
  let genre = getGenreSelected(state);
  if (genreFilm) {
    genre = genreFilm;
    number = NUMBER_FILM_GENRE;
  }
  if (genre === GENRE_DEFOULT) {
    films = state[NAME_SPACE].films.slice();
  } else {
    state[NAME_SPACE].films.map((item) => {
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
const getFavorites = (state, number = NUMBER_FILM) => {
  const favorites = state[NAME_SPACE].favorites.slice();
  if (favorites.length > number) {
    favorites.length = number;
  }
  return favorites;
};

const getReviews = (state) => {
  return state[NAME_SPACE].reviews.slice();
};

const getFilm = (state, id) => {
  const film = state[NAME_SPACE].films.find((item) => item.id === id);
  return film;
};

const getGeners = (state) => {
  return state[NAME_SPACE].genres;
};

export {getFilms, getFilm, getGeners, getFavorites, getReviews};
