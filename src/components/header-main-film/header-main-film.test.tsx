import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {HeaderMainFilm} from "./header-main-film";
import {FILM} from "../../mock/data-mock";
import reducer from "../../store";
Enzyme.configure({adapter: new Adapter()});

it(`HeaderMainFilm correctly renders after relaunch`, (): void => {
  const store = createStore(reducer);
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderMainFilm film={FILM} />
        </BrowserRouter>
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
