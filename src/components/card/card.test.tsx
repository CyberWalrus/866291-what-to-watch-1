import * as React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Card from "./card";
import {FILM} from "../../mock/mock-test";

it(`Card correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
      <BrowserRouter>
        <Card
          id={FILM.id}
          title={FILM.title}
          srcPreviewImage={FILM.srcPreviewImage}
          srcPreviewVideo={FILM.srcPreviewVideo}
          isActive={false}
          onMouseLeaveCard={handleClick}
          onMouseEnterCard={handleClick}
          onClickToRedirect={handleClick}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
