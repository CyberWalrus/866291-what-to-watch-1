import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import Footer from "./footer";
Enzyme.configure({adapter: new Adapter()});

it(`Footer correctly renders after relaunch`, (): void => {
  const tree = toJson(
    shallow(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
  );
  expect(tree).toMatchSnapshot();
});
