import React from "react";
import renderer from "react-test-renderer";
import FilmNav from "./film-nav.jsx";
import {FilmRoute} from "../../constants.js";
it(`FilmNav correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <FilmNav route={FilmRoute.OVERVIEW} changeFilmRoute={handleClick} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
