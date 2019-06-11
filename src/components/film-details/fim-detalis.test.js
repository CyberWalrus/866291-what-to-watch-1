import React from "react";
import renderer from "react-test-renderer";
import FilmDetails from "./film-details.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`FilmDetails correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <FilmDetails
          released={FILM.released}
          runTime={FILM.runTime}
          genre={FILM.genre}
          director={FILM.director}
          starrings={FILM.starrings}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
