import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {FilmButtonDiv} from "./film-button-div.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`FilmButtonDiv correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <BrowserRouter>
          <FilmButtonDiv
            id={FILM.id}
            isFavorite={false}
            onSendFavorite={handleClick}
            isAuthorizationRequired={false}
            onVideoScreenOpen={handleClick}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
