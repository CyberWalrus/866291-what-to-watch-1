import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import HiddenIcon from "./hidden-icon";
Enzyme.configure({adapter: new Adapter()});

it(`HiddenIcon correctly renders after relaunch`, (): void => {
  const tree = toJson(shallow(<HiddenIcon />));
  expect(tree).toMatchSnapshot();
});
