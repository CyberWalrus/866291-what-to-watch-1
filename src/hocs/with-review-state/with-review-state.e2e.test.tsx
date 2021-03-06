import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {withReviewState} from "./with-review-state";
import {FILM} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});

const WithReviewState = withReviewState((): React.ReactElement => <div />);

describe(`<WithReviewState/>`, (): void => {
  it(`Should default state`, (): void => {
    const handleClick = jest.fn();
    const tree = mount(
      <WithReviewState
        id={FILM.id}
        reviewMessage={``}
        onSendReview={handleClick}
        onResetReviewMessage={handleClick}
      />
    );
    expect(tree.state(`ratingSelected`)).toEqual(`0`);
    expect(tree.state(`ratingValid`)).toEqual(false);
    expect(tree.state(`textValid`)).toEqual(false);
    expect(tree.state(`formValid`)).toEqual(false);
    expect(tree.state(`isActive`)).toEqual(true);
    expect(tree.state(`redirect`)).toEqual(false);
  });
});
