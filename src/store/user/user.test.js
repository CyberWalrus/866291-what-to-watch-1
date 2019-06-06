import {ActionCreator, ActionType} from "./user.js";

describe(`Action works correctly`, () => {
  it(`Should return a correct status of authorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    });
  });
});
