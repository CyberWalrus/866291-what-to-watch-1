import NameSpace from "./../name-spaces.js";

const NAME_SPACE = NameSpace.FILTER;

const getGenreSelected = (state) => {
  return state[NAME_SPACE].genreSelected;
};

export {getGenreSelected};
