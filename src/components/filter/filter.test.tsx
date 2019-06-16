import * as React from "react";
import renderer from "react-test-renderer";
import {Filter} from "./filter";
import {GENRE_DEFOULT} from "../../constants";
import {GENRES} from "../../mock/mock-test";

it(`Filter correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <Filter
        genres={GENRES}
        genreSelected={GENRE_DEFOULT}
        onChangeFilter={handleClick}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
