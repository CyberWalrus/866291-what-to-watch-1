import {userDataAdapter} from "../../api/data-adapter.js";
import {Operation as OperationData} from "../data/data.js";

const initialState = {
  isAuthorizationRequired: true,
  user: {},
  errorMessage: ``
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SIGN_IN: `SIGN_IN`,
  SET_ERROR: `SET_ERROR`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },
  signIn: (user) => {
    return {
      type: ActionType.SIGN_IN,
      payload: user
    };
  },
  setError: (error) => {
    return {
      type: ActionType.SET_ERROR,
      payload: error
    };
  }
};

const Operation = {
  signIn: (email, password) => (dispatch, _getState, api) => {
    return api
      .post(`/login`, {
        email,
        password
      })
      .then((response) => {
        dispatch(ActionCreator.signIn(response.data));
        dispatch(ActionCreator.requireAuthorization(true));
        dispatch(OperationData.loadFavorites());
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.toString()));
        dispatch(ActionCreator.requireAuthorization(false));
      });
  },

  logOut: () => {
    ActionCreator.logOut();
    ActionCreator.requireAuthorization(false);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });

    case ActionType.SIGN_IN:
      return Object.assign({}, state, {
        user: userDataAdapter(action.payload)
      });

    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.payload
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
