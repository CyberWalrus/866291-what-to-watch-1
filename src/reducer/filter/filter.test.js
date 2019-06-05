import {reducer} from "./filter.js";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual({
      genreFilter: `all`
    });
  });

  it(`Reducer test reset`, () => {
    expect(
        reducer(
            {
              genreFilter: `comedy`,
            },
            {
              type: `RESET`
            }
        )
    ).toEqual({
      genreFilter: `all`
    });
  });
  it(`Reducer test change genre`, () => {
    expect(
        reducer(
            {
              genreFilter: `all`
            },
            {
              type: `CHANGE_GENRE`,
              genreNew: `comedy`
            }
        )
    ).toEqual({
      genreFilter: `comedy`
    });
  });
});
