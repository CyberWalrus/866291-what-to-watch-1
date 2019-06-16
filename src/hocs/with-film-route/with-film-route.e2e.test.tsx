import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import withFilmRoute from "./with-film-route";
import {FilmRoute} from "../../constants";
import {FILM} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});

const WithFilmRoute = withFilmRoute(() => <div />);

describe(`<WithFilmRoute/>`, () => {
  it(`Should default state`, () => {
    const tree = mount(<WithFilmRoute id={FILM.id} />);
    expect(tree.state(`route`)).toEqual(FilmRoute.OVERVIEW);
  });
});
