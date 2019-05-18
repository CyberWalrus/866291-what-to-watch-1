import {reducer} from "./reducer";
import films from "./mock/films.js";


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, ()=>{
    expect(reducer(undefined, {})).toEqual({
      genreFilter: `all`,
      films
    });
  });
});
