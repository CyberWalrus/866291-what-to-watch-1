import React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import PageSignIn from "./page-sign-in";
import reducer from "../../store";

it(`PageSignIn correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PageSignIn
              email={``}
              password={``}
              errorMessage={``}
              onChangeUserInput={handleClick}
              onClickSubmit={handleClick}
              formErrors={{}}
              formValid={false}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
