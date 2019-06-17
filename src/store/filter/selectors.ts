import NameSpace from "./../name-spaces";
import {StateApp} from "../../type/reducer";

const NAME_SPACE = NameSpace.FILTER;

const getGenreSelected = (state: StateApp): string => {
  return state[NAME_SPACE].genreSelected;
};
const getPlayFilmId = (state: StateApp): number => {
  return state[NAME_SPACE].playFilmId;
};

export {getGenreSelected, getPlayFilmId};
