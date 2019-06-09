import {GENRE_DEFOULT} from "../../mock/constants.js";

const intialState = {
  genreSelected: GENRE_DEFOULT,
  playFilmId: 0
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_PLAY_FILM: `SET_PLAY_FILM`,
  RESET: `RESET`
};

const ActionCreator = {
  changeGenre: (value) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: value
    };
  },
  setPlayFilmId: (filmId) => {
    return {
      type: ActionType.SET_PLAY_FILM,
      payload: filmId
    };
  },
  resetPlayFilmId: () => {
    return {
      type: ActionType.SET_PLAY_FILM,
      payload: intialState.playFilmId
    };
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        genreSelected: action.payload
      });

    case ActionType.SET_PLAY_FILM:
      return Object.assign({}, state, {
        playFilmId: action.payload
      });
    case ActionType.RESET:
      return Object.assign({}, intialState);
  }
  return state;
};

export {ActionCreator, reducer};
