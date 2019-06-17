import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {withVideoScreenState} from "./with-video-screen-state";

Enzyme.configure({adapter: new Adapter()});

const WithVideoScreenState = withVideoScreenState((): React.ReactElement => <div />);

describe(`<WithVideoScreenState/>`, (): void => {
  const handleClick = jest.fn();
  it(`Should default state`, (): void => {
    const tree = mount(
      <WithVideoScreenState playFilmId={0} onResetPlayFilmId={handleClick} />
    );
    expect(tree.state(`isOpen`)).toEqual(false);
    expect(tree.state(`isPlaying`)).toEqual(false);
    expect(tree.state(`filmId`)).toEqual(0);
    expect(tree.state(`togglerValue`)).toEqual(0);
    expect(tree.state(`time`)).toEqual(`00:00`);
    expect(tree.state(`progressValue`)).toEqual(0);
    expect(tree.state(`progressRef`)).toEqual(undefined);
    expect(tree.state(`videoRef`)).toEqual(undefined);
  });
});
