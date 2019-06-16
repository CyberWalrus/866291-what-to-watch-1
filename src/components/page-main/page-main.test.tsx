import * as React from "react";
import renderer from "react-test-renderer";
import PageMain from "./page-main";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

it(`PageMain correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PageMain />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
