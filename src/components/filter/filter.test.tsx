import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {Filter} from "./filter";
import {GENRE_DEFOULT} from "../../constants";
import {GENRES} from "../../mock/mock-test";
Enzyme.configure({adapter: new Adapter()});

it(`Filter correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <Filter
        genres={GENRES}
        genreSelected={GENRE_DEFOULT}
        onChangeFilter={handleClick}
      />
    )
  );
  expect(tree).toMatchSnapshot();
});
