import * as React from "react";
import renderer from "react-test-renderer";
import FilmNav from "./film-nav";
import {FilmRoute} from "../../constants";
it(`FilmNav correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <FilmNav route={FilmRoute.OVERVIEW} onChangeFilmRoute={handleClick} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
