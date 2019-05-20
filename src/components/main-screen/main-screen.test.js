import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";
import {reducer} from "../../reducer/reducer.js";
import {createStore} from "redux";
import {Provider} from "react-redux";

it(`MainScreen correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <MainScreen />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
