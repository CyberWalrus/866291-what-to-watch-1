import React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import SignInPage from "./sign-in";
import reducer from "../../store";

it(`SignInPage correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <SignInPage
              email={``}
              password={``}
              errorMessage={``}
              handleUserInput={handleClick}
              onSubmitClick={handleClick}
              formErrors={{}}
              formValid={false}

            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
