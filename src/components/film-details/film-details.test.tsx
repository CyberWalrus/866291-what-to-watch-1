import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import FilmDetails from "./film-details";
import {FILM} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});
it(`FilmDetails correctly renders after relaunch`, (): void => {
  const tree = toJson(
    shallow(
      <FilmDetails
        released={FILM.released}
        runTime={FILM.runTime}
        genre={FILM.genre}
        director={FILM.director}
        starrings={FILM.starrings}
      />
    )
  );
  expect(tree).toMatchSnapshot();
});
