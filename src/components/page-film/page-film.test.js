import React from "react";
import renderer from "react-test-renderer";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PageFilm} from "./page-film.jsx";
import {FILM} from "../../mock/mock-test.js";
import {FilmRoute} from "../../constants.js";

it(`PageFilm correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PageFilm
              id={FILM.id}
              route={FilmRoute.OVERVIEW}
              onChangeFilmRoute={handleClick}
              film={FILM}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
