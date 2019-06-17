import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import FilmOverview from "./film-overview";
import {FILM} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});
it(`FilmOverview correctly renders after relaunch`, (): void => {
  const tree = toJson(
    shallow(
      <FilmOverview
        rating={FILM.rating}
        ratingLevel={FILM.ratingLevel}
        scoresCount={FILM.scoresCount}
        description={FILM.description}
        director={FILM.director}
        starrings={FILM.starrings}
      />
    )
  );
  expect(tree).toMatchSnapshot();
});
