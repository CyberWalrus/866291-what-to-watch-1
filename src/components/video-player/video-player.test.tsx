import * as React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {FILM} from "../../mock/mock-test";
import {OptionsVideoFull} from "../../constants";

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
