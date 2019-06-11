import React from "react";
import renderer from "react-test-renderer";
import HiddenIcon from "./hidden-icon.jsx";

it(`HiddenIcon correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<HiddenIcon />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
