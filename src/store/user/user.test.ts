import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {SendUrl} from "../../constants";
import {userDataAdapter} from "../../api/data-adapter";
import {ActionCreator, ActionType, Operation, reducer} from "./user";
import {initialState} from "./user";
import {USER, USER_RESPONSE} from "../../mock/data-mock";

describe(`Action user correctly`, () => {
  it(`Should return a correct status of authorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    });
  });
  it(`Should return a correct signIn`, () => {
    expect(ActionCreator.signIn(USER_RESPONSE)).toEqual({
      type: ActionType.SIGN_IN,
      payload: userDataAdapter(USER_RESPONSE)
    });
  });
  it(`Should return a correct setError`, () => {
    expect(ActionCreator.setError(`error`)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error`
    });
  });
  it(`Should return a correct resetError`, () => {
    expect(ActionCreator.resetError()).toEqual({
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
      .reply(200, USER_RESPONSE);

    return signIn(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SIGN_IN,
        payload: userDataAdapter(USER_RESPONSE)
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: true
      });
    });
  });
});

describe(`Reducer user correctly`, () => {

  it(`Reducer test set authorization`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: true
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isAuthorizationRequired: true
      }));
  });
  it(`Reducer test change SIGN_IN`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.SIGN_IN,
        payload: USER
      })
    ).toEqual(
      Object.assign({}, initialState, {
        user: USER
      })
    );
  });
  it(`Reducer test set error`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_ERROR,
        payload: `error`
      })
    ).toEqual(
      Object.assign({}, initialState, {
        errorMessage: `error`
      })
    );
  });
});
