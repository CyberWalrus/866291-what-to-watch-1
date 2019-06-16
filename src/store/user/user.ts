import {Action as ReduxAction} from "redux";
import {AxiosResponse, AxiosError, AxiosInstance} from "axios";
import {userDataAdapter} from "../../api/data-adapter";
import {SendUrl} from "../../constants";
import {Operation as OperationData} from "../data/data";
import {User} from "../../type/data";
import {StateApp, ThunkDispatch, ThunkAction} from "../../type/reducer";
import {UserResponse} from "../../type/dataResponse";

enum ActionType {
  REQUIRED_AUTHORIZATION = "REQUIRED_AUTHORIZATION",
  SIGN_IN = "SIGN_IN",
  SET_ERROR = "SET_ERROR"
}
interface State {
  isAuthorizationRequired: boolean;
  user: User;
  errorMessage: string;
}
interface RequireAuthorization extends ReduxAction {
  type: ActionType;
  payload: boolean;
}
interface SignIn extends ReduxAction {
  type: ActionType;
  payload: User;
}
interface SetError extends ReduxAction {
  type: ActionType;
  payload: string;
}
type Action = RequireAuthorization | SignIn | SetError;

const initialState: State = {
  isAuthorizationRequired: false,
  user: undefined,
  errorMessage: ``
};

const ActionCreator = {
  requireAuthorization: (status: boolean): RequireAuthorization => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },
  signIn: (user: UserResponse): SignIn => {
    return {
      type: ActionType.SIGN_IN,
      payload: userDataAdapter(user)
    };
  },
  setError: (error: string): SetError => {
    return {
      type: ActionType.SET_ERROR,
      payload: error
    };
  },
  resetError: (): SetError => {
    return {
      type: ActionType.SET_ERROR,
      payload: initialState.errorMessage
    };
  }
};

const Operation = {
  signIn: (email: string, password: string): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .post(SendUrl.LOGIN, {
          email,
          password
        })
        .then(
          (response: AxiosResponse<Record<string, any>>): void => {
            dispatch(ActionCreator.signIn(response.data));
            dispatch(ActionCreator.requireAuthorization(true));
            dispatch(OperationData.loadFilms());
            dispatch(OperationData.loadFavorites());
          }
        )
        .catch(
          (error: AxiosError): void => {
            dispatch(ActionCreator.setError(error.toString()));
            dispatch(ActionCreator.requireAuthorization(false));
          }
        );
    };
  }
};

const reducer = (state: State = initialState, action: Action) => {
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

export {State, Action, ActionCreator, ActionType, Operation, reducer};
