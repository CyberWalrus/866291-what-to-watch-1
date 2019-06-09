import NameSpace from "./../name-spaces.js";

const NAME_SPACE = NameSpace.FILTER;

const getGenreSelected = (state) => {
  return state[NAME_SPACE].genreSelected;
};
const getPlayFilmId = (state) => {
  return state[NAME_SPACE].playFilmId;
};

export {getGenreSelected, getPlayFilmId};
