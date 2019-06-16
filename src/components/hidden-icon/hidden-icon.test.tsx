import * as React from "react";
import renderer from "react-test-renderer";
import HiddenIcon from "./hidden-icon";

it(`HiddenIcon correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<HiddenIcon />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
