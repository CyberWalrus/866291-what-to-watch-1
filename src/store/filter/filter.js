import {GENRE_DEFOULT} from "../../constants";

const initialState = {
  genreSelected: GENRE_DEFOULT,
  playFilmId: 0
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_PLAY_FILM: `SET_PLAY_FILM`
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
      payload: initialState.playFilmId
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        genreSelected: action.payload
      });

    case ActionType.SET_PLAY_FILM:
      return Object.assign({}, state, {
        playFilmId: action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
