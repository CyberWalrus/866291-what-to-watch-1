import React from "react";
import renderer from "react-test-renderer";
import CardList from "./card-list.jsx";
import films from "../../mock/films-test";

it(`CardList component renders correctly with props`, () => {
  const tree = renderer.create(<CardList films={films} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`CardList component renders correctly with empty props`, () => {
  const tree = renderer.create(<CardList/>).toJSON();
  expect(tree).toMatchSnapshot();
});
