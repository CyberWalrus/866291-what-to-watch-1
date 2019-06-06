import NameSpace from "./../name-spaces.js";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getFilm = (state, id) => {
  const film = state[NAME_SPACE].films.find((x) => x.id === id);
  return film;
};
