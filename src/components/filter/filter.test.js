import React from "react";
import renderer from "react-test-renderer";
import {Filter} from "./filter.jsx";
import {GENRE_DEFOULT} from "../../mock/constants.js";
import {GENRES} from "../../mock/mock-test.js";

it(`Filter correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(<Filter genres={GENRES} genreSelected={GENRE_DEFOULT} changeFilter={handleClick} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
