import * as React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import PageMyList from "./page-my-list";
import reducer from "../../store";

it(`PageMyList correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PageMyList />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
