import React from "react";
import renderer from "react-test-renderer";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {FilmScreen} from "./film-screen.jsx";
import {FILM} from "../../mock/mock-test.js";
import {FilmRoute} from "../../mock/constants.js";

it(`FilmScreen correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <FilmScreen
              id={FILM.id}
              route={FilmRoute.OVERVIEW}
              changeFilmRoute={handleClick}
              film={FILM}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
