import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`Card correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <Card
          id={FILM.id}
          title={FILM.title}
          srcPreviewImage={FILM.srcPreviewImage}
          genre={FILM.genre}
          preview={FILM.preview}
          isPlay={false}
          onCardMouseOver={handleClick}
          onCardMouseLeave={handleClick}
          onClickComponent={handleClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
