import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {FilmReview} from "./film-review";
import {FILM, REVIEWS} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});
it(`FilmReview correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <FilmReview
        filmId={FILM.id}
        onLoadReviews={handleClick}
        reviews={REVIEWS}
      />
    )
  );
  expect(tree).toMatchSnapshot();
});
