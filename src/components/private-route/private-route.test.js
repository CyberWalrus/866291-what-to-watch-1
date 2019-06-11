import React from "react";
import renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route.jsx";
import {BrowserRouter, Switch} from "react-router-dom";

it(`PrivateRoute correctly renders after relaunch`, () => {
  const TestComponent = () => {
    return <div />;
  };
  const tree = renderer
    .create(
        <BrowserRouter>
          <Switch>
            <PrivateRoute
              component={TestComponent}
              isAuthorizationRequired={true}
              location={{}}
            />
          </Switch>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
