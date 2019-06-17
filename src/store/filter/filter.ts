import {GENRE_DEFOULT} from "../../constants";
import {Action as ReduxAction} from "redux";

enum ActionType {
  CHANGE_GENRE = "CHANGE_GENRE",
  SET_PLAY_FILM = "SET_PLAY_FILM"
}
export interface State {
  genreSelected: string;
  playFilmId: number;
}
interface ChangeGenre extends ReduxAction {
  type: ActionType;
  payload: string;
}
interface SetPlayFilmId extends ReduxAction {
  type: ActionType;
  payload: number;
}
interface ResetPlayFilmId extends ReduxAction {
  type: ActionType;
  payload: number;
}
export type Action = ChangeGenre | SetPlayFilmId | ResetPlayFilmId;

const initialState: State = {
  genreSelected: GENRE_DEFOULT,
  playFilmId: 0
};

const ActionCreator = {
  changeGenre: (value: string): ChangeGenre => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: value
    };
  },
  setPlayFilmId: (filmId: number): SetPlayFilmId => {
    return {
      type: ActionType.SET_PLAY_FILM,
      payload: filmId
    };
  },
  resetPlayFilmId: (): ResetPlayFilmId => {
    return {
      type: ActionType.SET_PLAY_FILM,
      payload: initialState.playFilmId
    };
  }
};

const reducer = (state: State = initialState, action: Action): State => {
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

export {initialState, ActionCreator, ActionType, reducer};
