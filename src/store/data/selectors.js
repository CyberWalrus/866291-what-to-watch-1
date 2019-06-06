import NameSpace from "./../name-spaces.js";
import {GENRE_DEFOULT} from "../../mock/constants.js";
import {getGenreSelected} from "../filter/selectors.js";

const NAME_SPACE = NameSpace.DATA;

const getFilms = (state) => {
  let films = [];
  const genre = getGenreSelected(state);
  if (genre === GENRE_DEFOULT) {
    films = state[NAME_SPACE].films.slice();
  } else {
    state[NAME_SPACE].films.map((item) => {
      if (item.genre === genre) {
        films.push(item);
      }
    });
  }
  if (films.length > 20) {
    films.length = 20;
  }
  console.log(state[NAME_SPACE].films);
  return films;
};

const getFilm = (state, id) => {
  const film = state[NAME_SPACE].films.find((item) => item.id === id);
  return film;
};

const getGeners = (state) => {
  return state[NAME_SPACE].genres;
};

export {getFilms, getFilm, getGeners};
