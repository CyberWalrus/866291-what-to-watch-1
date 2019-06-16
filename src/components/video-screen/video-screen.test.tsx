import * as React from "react";
import renderer from "react-test-renderer";
import {VideoScreen} from "./video-screen";
import {FILM} from "../../mock/mock-test";

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
        onMouseTogglerDown={handleClick}
        film={FILM}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
