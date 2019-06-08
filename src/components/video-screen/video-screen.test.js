import React from "react";
import renderer from "react-test-renderer";
import {VideoScreen} from "./video-screen.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`VideoScreen correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <VideoScreen
          isPlaying={false}
          onPlayChange={handleClick}
          onVideoScreenClose={handleClick}
          film={FILM}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
