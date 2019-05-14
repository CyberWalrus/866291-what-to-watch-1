import React from "react";
import renderer from "react-test-renderer";
import App from "../app/app.jsx";
import films from "../../mock/films-test";

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App films={films}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
