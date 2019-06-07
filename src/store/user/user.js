import {userDataAdapter} from "../../api/data-adapter.js";
const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SIGN_IN: `SIGN_IN`,
  LOG_OUT: `LOG_OUT`
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
  logOut: () => {
    return {
      type: ActionType.LOG_OUT,
      payload: {}
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
      })
      .catch(() => {
        dispatch(ActionCreator.logOut());
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

    case ActionType.LOG_OUT:
      return Object.assign({}, state, {
        user: action.payload
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
