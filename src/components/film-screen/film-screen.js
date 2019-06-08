import React from "react";
import renderer from "react-test-renderer";
import {FilmScreen} from "./film-screen.jsx";
import {FILM} from "../../mock/mock-test.js";
import {FilmRoute} from "../../mock/constants.js";

it(`FilmScreen correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <FilmScreen
          id={FILM.id}
          route={FilmRoute.OVERVIEW}
          changeFilmRoute={handleClick}
          film={FILM}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
