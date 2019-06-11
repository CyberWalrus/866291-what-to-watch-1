import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {CardList} from "./card-list.jsx";
import {FILMS} from "../../mock/mock-test.js";
import {NUMBER_FILM} from "../../constants.js";

it(`CardList component renders correctly with props`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <BrowserRouter>
          <CardList
            films={FILMS}
            numberFilm={NUMBER_FILM}
            onShowMoreClick={handleClick}
            onClickToRedirect={handleClick}
            setActiveFilm={handleClick}
            removeActiveFilm={handleClick}
            activeFilm={0}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it(`CardList component renders correctly with empty props`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <BrowserRouter>
          <CardList
            numberFilm={NUMBER_FILM}
            onShowMoreClick={handleClick}
            onClickToRedirect={handleClick}
            setActiveFilm={handleClick}
            removeActiveFilm={handleClick}
            activeFilm={0}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
