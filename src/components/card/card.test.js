import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";

it(`Card correctly renders after relaunch`, () => {
  const clickFn = jest.fn();
  const tree = renderer
    .create(
        <Card
          id={1}
          genre="comedy"
          title="What We Do in the Shadows"
          src="img/what-we-do-in-the-shadows.jpg"
          preview="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
          isPlay={false}
          onMouseLeave={clickFn}
          onMouseOver={clickFn}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
