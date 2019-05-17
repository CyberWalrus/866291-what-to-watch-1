import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

it(`VideoPlayer correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <VideoPlayer
          poster="img/what-we-do-in-the-shadows.jpg"
          preview="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
