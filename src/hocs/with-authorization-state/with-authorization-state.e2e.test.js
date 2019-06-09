import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withAuthorizationState} from "./with-authorization-state.js";

Enzyme.configure({adapter: new Adapter()});

const WithAuthorizationState = withAuthorizationState(() => <div />);

describe(`<WithAuthorizationState/>`, () => {
  it(`Should default state`, () => {
    const handleClick = jest.fn();
    const tree = mount(
        <WithAuthorizationState errorMessage={``} signIn={handleClick} resetError={handleClick} />
    );
    expect(tree.state(`email`)).toEqual(``);
    expect(tree.state(`password`)).toEqual(``);
  });
});
