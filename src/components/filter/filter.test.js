import React from "react";
import renderer from "react-test-renderer";
import {Filter} from "./filter.jsx";

it(`Filter correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(<Filter genreFilter={`all`} changeFilter={handleClick} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
