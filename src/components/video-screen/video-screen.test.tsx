import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {VideoScreen} from "./video-screen";
import {FILM} from "../../mock/mock-test";
Enzyme.configure({adapter: new Adapter()});

it(`VideoScreen correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
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
  );
  expect(tree).toMatchSnapshot();
});
