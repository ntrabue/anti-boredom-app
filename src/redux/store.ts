import { combineReducers, createStore } from "redux";
import { reducer as eventReducer } from "./events/reducer";
import { eventReducerState } from "../types";

export interface IRootStore {
  events: eventReducerState;
}
export const rootReducer = combineReducers({ events: eventReducer });

export default createStore(
  rootReducer,
  (window as any)?.__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
