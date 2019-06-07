import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveFilm from './with-active-film.js';
import {NUMBER_FILM} from "../../mock/constants.js";

Enzyme.configure({adapter: new Adapter()});

const WithActiveFilmWrapper = withActiveFilm(() => (<div/>));

describe(`<withActiveFilm/>`, () => {
  it(`Should default state activeFilm === null`, () => {
    const tree = mount(<WithActiveFilmWrapper/>);
    expect(tree.state(`activeFilm`)).toEqual(0);
    expect(tree.state(`numberFilm`)).toEqual(NUMBER_FILM);
    expect(tree.state(`redirect`)).toEqual(false);
    expect(tree.state(`redirectId`)).toEqual(0);
  });
});
