import {combineReducers} from "redux";
import {reducer as filter} from "./filter/filter.js";
import {reducer as data} from "./data/data.js";
import NameSpace from "./name-spaces.js";

export default combineReducers({
  [NameSpace.FILTER]: filter,
  [NameSpace.DATA]: data
});
