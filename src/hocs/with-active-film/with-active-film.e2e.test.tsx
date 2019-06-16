import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import withActiveFilm from "./with-active-film";
import {NUMBER_FILM} from "../../constants";

Enzyme.configure({adapter: new Adapter()});

const WithActiveFilmWrapper = withActiveFilm(() => <div />);

describe(`<withActiveFilm/>`, () => {
  it(`Should default state`, () => {
    const tree = mount(<WithActiveFilmWrapper />);
    expect(tree.state(`activeFilm`)).toEqual(0);
    expect(tree.state(`numberFilm`)).toEqual(NUMBER_FILM);
    expect(tree.state(`redirectId`)).toEqual(0);
    expect(tree.state(`timeOutId`)).toEqual(0);
  });
});
