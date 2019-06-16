import {ThunkDispatch as ReduxThunkDispatch, ThunkAction as ReduxThunkAction} from "redux-thunk";
import {AxiosInstance} from "axios";
import {State as StateData, Action as ActionData} from "../store/data/data";
import {State as StateFilter, Action as ActionFilter} from "../store/filter/filter";
import {State as StateUser, Action as ActionUser} from "../store/user/user";
import NameSpace from "../store/name-spaces";

export interface StateApp {
  [NameSpace.DATA]: StateData;
  [NameSpace.FILTER]: StateFilter;
  [NameSpace.USER]: StateUser;
}

export type ActionApp = ActionData | ActionFilter | ActionUser;
export type ThunkDispatch = ReduxThunkDispatch<StateApp, AxiosInstance, ActionApp>;
export type ThunkAction = ReduxThunkAction<
Promise<void>,
StateApp,
AxiosInstance,
ActionApp
>;
