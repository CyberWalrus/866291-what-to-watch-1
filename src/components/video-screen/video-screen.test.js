import React from "react";
import renderer from "react-test-renderer";
import {VideoScreen} from "./video-screen.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`VideoScreen correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <VideoScreen
          filmId={FILM.id}
          time={`00:00`}
          progressValue={0}
          isPlaying={false}
          onChangePlay={handleClick}
          onClickClose={handleClick}
          onClickFullScreen={handleClick}
          onSendVideoRef={handleClick}
          onSendProgressRef={handleClick}
          film={FILM}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
