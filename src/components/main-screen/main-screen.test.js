import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";

it(`MainScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MainScreen films={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `We need to talk about Kevin`]} onPlayButtonClick={jest.fn()}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
