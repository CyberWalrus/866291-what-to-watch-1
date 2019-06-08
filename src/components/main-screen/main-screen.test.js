import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

it(`MainScreen correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <MainScreen />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
