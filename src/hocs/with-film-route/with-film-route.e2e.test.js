import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmRoute from "./with-film-route.js";
import {FilmRoute} from "../../constants.js";
import {FILM} from "../../mock/mock-test.js";

Enzyme.configure({adapter: new Adapter()});

const WithFilmRoute = withFilmRoute(() => <div />);

describe(`<WithFilmRoute/>`, () => {
  it(`Should default state`, () => {
    const tree = mount(
        <WithFilmRoute
          id={FILM.id}
        />
    );
    expect(tree.state(`route`)).toEqual(FilmRoute.OVERVIEW);
  });
});
