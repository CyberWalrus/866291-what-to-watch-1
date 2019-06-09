import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withReviewState} from "./with-review-state.js";
import {FILM} from "../../mock/mock-test.js";

Enzyme.configure({adapter: new Adapter()});

const WithReviewState = withReviewState(() => <div />);

describe(`<WithReviewState/>`, () => {
  it(`Should default state`, () => {
    const handleClick = jest.fn();
    const tree = mount(
        <WithReviewState
          id={FILM.id}
          errorMessage={``}
          sendReview={handleClick}
        />
    );
    expect(tree.state(`ratingSelected`)).toEqual(`0`);
    expect(tree.state(`text`)).toEqual(``);
  });
});
