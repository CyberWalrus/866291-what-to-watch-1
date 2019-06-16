import NameSpace from "./../name-spaces";
import {StateApp} from "../../type/reducer";
import {User} from "../../type/data";

const NAME_SPACE = NameSpace.USER;

const getAuthorizationStatus = (state: StateApp): boolean => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

const getUser = (state: StateApp): User => {
  return state[NAME_SPACE].user;
};
const getError = (state: StateApp): string => {
  return state[NAME_SPACE].errorMessage;
};

export {getUser, getAuthorizationStatus, getError};
