import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideoScreen from "./with-video-screen.js";

Enzyme.configure({adapter: new Adapter()});

const WithVideoScreen = withVideoScreen(() => <div />);

describe(`<WithVideoScreen/>`, () => {
  it(`Should default state`, () => {
    const tree = mount(
        <WithVideoScreen
        />
    );
    expect(tree.state(`isOpen`)).toEqual(false);
    expect(tree.state(`isPlaying`)).toEqual(false);
  });
});
