import {GENRE_DEFOULT} from "../../mock/constants.js";

const intialState = {
  genreSelected: GENRE_DEFOULT
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  RESET: `RESET`
};

const ActionCreator = {
  changeGenre: (value) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: value
    };
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        genreSelected: action.payload
      });
    case ActionType.RESET:
      return Object.assign({}, intialState);
  }
  return state;
};

export {ActionCreator, reducer};
