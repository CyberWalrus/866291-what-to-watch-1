import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import FilmNav from "./film-nav";
import {FilmRoute} from "../../constants";

Enzyme.configure({adapter: new Adapter()});
it(`FilmNav correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <FilmNav route={FilmRoute.OVERVIEW} onChangeFilmRoute={handleClick} />
    )
  );
  expect(tree).toMatchSnapshot();
});
