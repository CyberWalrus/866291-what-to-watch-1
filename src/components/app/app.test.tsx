import * as React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";

it(`App correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <Provider store={store}>
        <App isActive={true} loadFilms={handleClick}  />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
