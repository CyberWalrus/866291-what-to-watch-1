import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {SendUrl} from "../../constants";
import {userDataAdapter} from "../../api/data-adapter";
import {ActionCreator, ActionType, Operation, reducer} from "./user";

const initialState = {
  isAuthorizationRequired: false,
  user: {},
  errorMessage: ``
};

describe(`Action user correctly`, () => {
  it(`Should return a correct status of authorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    });
  });
  it(`Should return a correct signIn`, () => {
    expect(ActionCreator.signIn({fake: true})).toEqual({
      type: ActionType.SIGN_IN,
      payload: userDataAdapter({fake: true})
    });
  });
  it(`Should return a correct setError`, () => {
    expect(ActionCreator.setError(`error`)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error`
    });
  });
  it(`Should return a correct resetError`, () => {
    expect(ActionCreator.resetError(true)).toEqual({
      type: ActionType.SET_ERROR,
      payload: initialState.errorMessage
    });
  });
});

describe(`Operation user correctly`, () => {
  it(`Should make a correct API call to ${SendUrl.LOGIN}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const email = `katopuh25@gmail.com`;
    const password = `123`;
    const signIn = Operation.signIn(email, password);

    apiMock
      .onPost(SendUrl.LOGIN, {
        email,
        password
      })
      .reply(200, {fake: true});

    return signIn(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_ERROR,
        payload: `Error: Request failed with status code 404`
      });
    });
  });
});

describe(`Reducer user correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer test set authorization`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true
        })
    ).toEqual({
      isAuthorizationRequired: true,
      user: {},
      errorMessage: ``
    });
  });
  it(`Reducer test change SIGN_IN`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SIGN_IN,
          payload: {test: `test`}
        })
    ).toEqual({
      isAuthorizationRequired: false,
      user: {test: `test`},
      errorMessage: ``
    });
  });
  it(`Reducer test set error`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_ERROR,
          payload: `error`
        })
    ).toEqual({
      isAuthorizationRequired: false,
      user: {},
      errorMessage: `error`
    });
  });
});
