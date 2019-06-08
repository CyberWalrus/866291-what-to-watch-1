import React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import MyList from "./my-list.jsx";
import reducer from "../../store";

it(`MyList correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <MyList />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
