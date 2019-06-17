import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {PrivateRoute} from "./private-route";
import {BrowserRouter, Switch} from "react-router-dom";
Enzyme.configure({adapter: new Adapter()});

it(`PrivateRoute correctly renders after relaunch`, (): void => {
  const TestComponent = (): React.ReactElement => {
    return <div />;
  };
  const tree = toJson(
    shallow(
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
  );
  expect(tree).toMatchSnapshot();
});
