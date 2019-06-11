import React from "react";
import renderer from "react-test-renderer";
import FilmOverview from "./film-overview.jsx";
import {FILM} from "../../mock/mock-test.js";
it(`FilmOverview correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <FilmOverview
          rating={FILM.rating}
          ratingLevel={FILM.ratingLevel}
          scoresCount={FILM.scoresCount}
          description={FILM.description}
          director={FILM.director}
          starrings={FILM.starrings}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
