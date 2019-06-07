import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";

it(`SignIn correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer.create(<SignIn signIn={handleClick} />).toJSON();
  expect(tree).toMatchSnapshot();
});
