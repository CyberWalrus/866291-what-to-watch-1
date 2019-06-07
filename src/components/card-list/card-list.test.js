import React from "react";
import renderer from "react-test-renderer";
import {CardList} from "./card-list.jsx";
import {FILMS} from "../../mock/mock-test.js";
import {NUMBER_FILM} from "../../mock/constants.js";

it(`CardList component renders correctly with props`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <CardList
          films={FILMS}
          numberFilm={NUMBER_FILM}
          onShowMoreClick={handleClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it(`CardList component renders correctly with empty props`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(<CardList numberFilm={NUMBER_FILM} onShowMoreClick={handleClick} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
