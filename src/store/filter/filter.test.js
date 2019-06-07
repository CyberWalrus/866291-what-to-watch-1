import {reducer} from "./filter.js";
import {GENRE_DEFOULT} from "../../mock/constants.js";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual({
      genreSelected: GENRE_DEFOULT
    });
  });

  it(`Reducer test reset`, () => {
    expect(
        reducer(
            {
              genreSelected: `comedy`,
            },
            {
              type: `RESET`
            }
        )
    ).toEqual({
      genreSelected: GENRE_DEFOULT
    });
  });
  it(`Reducer test change genre`, () => {
    expect(
        reducer(
            {
              genreSelected: GENRE_DEFOULT
            },
            {
              type: `CHANGE_GENRE`,
              payload: `comedy`
            }
        )
    ).toEqual({
      genreSelected: `comedy`
    });
  });
});
