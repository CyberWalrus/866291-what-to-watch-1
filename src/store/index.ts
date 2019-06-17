import {combineReducers} from "redux";
import {reducer as filter} from "./filter/filter";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";
import NameSpace from "./name-spaces";
import {StateApp} from "../type/reducer";

export default combineReducers<StateApp>({
  [NameSpace.FILTER]: filter,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user
});
