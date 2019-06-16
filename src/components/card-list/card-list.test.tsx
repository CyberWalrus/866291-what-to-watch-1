import * as React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {CardList} from "./card-list";
import {FILMS} from "../../mock/mock-test";
import {NUMBER_FILM, GENRE_DEFOULT} from "../../constants";

it(`CardList component renders correctly with props`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <BrowserRouter>
        <CardList
          filmId={1}
          films={FILMS}
          numberFilm={NUMBER_FILM}
          activeFilm={0}
          isFavorite={true}
          onClickShowMore={handleClick}
          onMouseEnterCard={handleClick}
          onMouseLeaveCard={handleClick}
          onClickToRedirect={handleClick}
          genreFilm={GENRE_DEFOULT}
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
          filmId={1}
          films={[]}
          numberFilm={NUMBER_FILM}
          activeFilm={0}
          isFavorite={true}
          onClickShowMore={handleClick}
          onMouseEnterCard={handleClick}
          onMouseLeaveCard={handleClick}
          onClickToRedirect={handleClick}
          genreFilm={GENRE_DEFOULT}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
