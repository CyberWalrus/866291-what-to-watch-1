import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./header";

it(`Header correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header
            isAuthorizationRequired={true}
            user={{}}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
