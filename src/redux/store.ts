import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as eventReducer } from "./events/reducer";
import { reducer as playerReducer } from "./players/reducer";
import { eventReducerState } from "./events/types";
import { IPlayerReducer } from "./players/types";

export interface IRootStore {
  events: eventReducerState;
  players: IPlayerReducer;
}
export const rootReducer = combineReducers({
  events: eventReducer,
  players: playerReducer,
});
const windowElement = window as any;
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    windowElement.devToolsExtension
      ? windowElement.devToolsExtension()
      : (f: any) => f
  )
);
