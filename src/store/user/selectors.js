import NameSpace from "./../name-spaces.js";

const NAME_SPACE = NameSpace.USER;

const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

const getUser = (state) => {
  return state[NAME_SPACE].user;
};
const getError = (state) => {
  return state[NAME_SPACE].errorMessage;
};

export {getUser, getAuthorizationStatus, getError};
