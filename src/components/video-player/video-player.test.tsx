import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import VideoPlayer from "./video-player";
import {FILM} from "../../mock/data-mock";
import {OptionsVideoFull} from "../../constants";
Enzyme.configure({adapter: new Adapter()});

it(`VideoPlayer correctly renders after relaunch`, (): void => {
  const tree = toJson(
    shallow(
      <VideoPlayer
        videoSrc={FILM.srcVideo}
        posterSrc={FILM.srcPosterImage}
        options={OptionsVideoFull}
        isPlaying={false}
      />
    )
  );
  expect(tree).toMatchSnapshot();
});
