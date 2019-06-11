import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";
import {FILM} from "../../mock/mock-test.js";
import {OptionsVideoFull} from "../../constants.js";

it(`VideoPlayer correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <VideoPlayer
          videoSrc={FILM.srcVideo}
          posterSrc={FILM.srcPosterImage}
          options={OptionsVideoFull}
          isPlaying={false}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
