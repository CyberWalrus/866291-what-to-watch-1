import * as React from "react";
import renderer from "react-test-renderer";
import {FilmReview} from "./film-review";
import {FILM, REVIEWS} from "../../mock/mock-test";

it(`FilmReview correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <FilmReview
        filmId={FILM.id}
        onLoadReviews={handleClick}
        reviews={REVIEWS}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
