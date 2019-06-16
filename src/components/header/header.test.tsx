import * as React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./header";
import {USER} from "../../mock/mock-test";

it(`Header correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Header isAuthorizationRequired={true} user={USER} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
