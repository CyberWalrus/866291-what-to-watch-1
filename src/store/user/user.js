import {userDataAdapter} from "../../api/data-adapter.js";
import {SendUrl} from "../../constants.js";
import {Operation as OperationData} from "../data/data.js";

const initialState = {
  isAuthorizationRequired: false,
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
      payload: userDataAdapter(user)
    };
  },
  setError: (error) => {
    return {
      type: ActionType.SET_ERROR,
      payload: error
    };
  },
  resetError: () => {
    return {
      type: ActionType.SET_ERROR,
      payload: initialState.errorMessage
    };
  }
};

const Operation = {
  signIn: (email, password) => (dispatch, _getState, api) => {
    return api
      .post(SendUrl.LOGIN, {
        email,
        password
      })
      .then((response) => {
        dispatch(ActionCreator.signIn(response.data));
        dispatch(ActionCreator.requireAuthorization(true));
        dispatch(OperationData.loadFilms());
        dispatch(OperationData.loadFavorites());
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.toString()));
        dispatch(ActionCreator.requireAuthorization(false));
      });
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
        user: action.payload
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
