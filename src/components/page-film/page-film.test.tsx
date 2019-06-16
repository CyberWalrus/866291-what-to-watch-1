import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PageFilm} from "./page-film";
import {FILM} from "../../mock/mock-test";
import {FilmRoute} from "../../constants";
Enzyme.configure({adapter: new Adapter()});

it(`PageFilm correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const store = createStore(reducer);
  const tree = toJson(
    shallow(
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
  );
  expect(tree).toMatchSnapshot();
});
