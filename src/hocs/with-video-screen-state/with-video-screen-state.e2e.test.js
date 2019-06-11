import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withVideoScreenState} from "./with-video-screen-state.js";

Enzyme.configure({adapter: new Adapter()});

const WithVideoScreenState = withVideoScreenState(() => <div />);

describe(`<WithVideoScreenState/>`, () => {
  const handleClick = jest.fn();
  it(`Should default state`, () => {
    const tree = mount(
        <WithVideoScreenState playFilmId={0} onResetPlayFilmId={handleClick} />
    );
    expect(tree.state(`isOpen`)).toEqual(false);
    expect(tree.state(`isPlaying`)).toEqual(false);
    expect(tree.state(`filmId`)).toEqual(0);
  });
});
