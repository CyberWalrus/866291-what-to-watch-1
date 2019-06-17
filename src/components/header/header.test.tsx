import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./header";
import {USER} from "../../mock/data-mock";
Enzyme.configure({adapter: new Adapter()});

it(`Header correctly renders after relaunch`, (): void => {
  const tree = toJson(
    shallow(
      <BrowserRouter>
        <Header isAuthorizationRequired={true} user={USER} />
      </BrowserRouter>
    )
  );
  expect(tree).toMatchSnapshot();
});
