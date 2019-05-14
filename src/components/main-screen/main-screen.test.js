import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";
import films from "../../mock/films-test";

it(`MainScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MainScreen films={films}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
