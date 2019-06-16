import * as React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {HeaderMainFilm} from "./header-main-film";
import {FILM} from "../../mock/mock-test.js";
import reducer from "../../store";

it(`HeaderMainFilm correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderMainFilm film={FILM} />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
