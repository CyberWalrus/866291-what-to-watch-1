import {reducer, ActionCreator, ActionType} from "./filter.js";
import {GENRE_DEFOULT} from "../../constants.js";
const initialState = {
  genreSelected: GENRE_DEFOULT,
  playFilmId: 0
};
describe(`Action filter correctly`, () => {
  it(`Should return a correct values`, () => {
    expect(ActionCreator.changeGenre(`comedy`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `comedy`
    });
    expect(ActionCreator.setPlayFilmId(1)).toEqual({
      type: ActionType.SET_PLAY_FILM,
      payload: 1
    });
    expect(ActionCreator.resetPlayFilmId()).toEqual({
      type: ActionType.SET_PLAY_FILM,
      payload: initialState.playFilmId
    });
  });
});

describe(`Reducer filter correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer test set play film`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_PLAY_FILM,
          payload: 1
        })
    ).toEqual({
      genreSelected: GENRE_DEFOULT,
      playFilmId: 1
    });
  });
  it(`Reducer test change genre`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.CHANGE_GENRE,
          payload: `comedy`
        })
    ).toEqual({
      genreSelected: `comedy`,
      playFilmId: 0
    });
  });
});
