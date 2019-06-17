import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {CardList} from "./card-list";
import {FILMS} from "../../mock/data-mock";
import {NUMBER_FILM, GENRE_DEFOULT} from "../../constants";

Enzyme.configure({adapter: new Adapter()});
it(`CardList component renders correctly with props`, (): void => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
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
  );
  expect(tree).toMatchSnapshot();
});
it(`CardList component renders correctly with empty props`, (): void => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
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
  );
  expect(tree).toMatchSnapshot();
});
