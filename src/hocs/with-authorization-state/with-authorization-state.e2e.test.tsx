import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {withAuthorizationState} from "./with-authorization-state";

Enzyme.configure({adapter: new Adapter()});

const WithAuthorizationState = withAuthorizationState(() => <div />);

describe(`<WithAuthorizationState/>`, () => {
  it(`Should default state`, () => {
    const handleClick = jest.fn();
    const tree = mount(
      <WithAuthorizationState
        errorMessage={``}
        onSignIn={handleClick}
        onResetError={handleClick}
      />
    );
    expect(tree.state(`email`)).toEqual(``);
    expect(tree.state(`password`)).toEqual(``);
    expect(tree.state(`formErrors`)).toEqual({
      email: ``,
      password: ``,
      signIn: ``
    });
    expect(tree.state(`emailValid`)).toEqual(false);
    expect(tree.state(`passwordValid`)).toEqual(true);
    expect(tree.state(`formValid`)).toEqual(false);
  });
});
