import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import reducer from "../../reducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

it(`App correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
