import {
  PLAYER_ADD_PLAYER,
  PLAYER_SET_ACTIVE,
  PLAYER_SET_PLAYERS,
} from "./constants";
import { IPlayer, ISetActivePlayer } from "./types";
import { IRootStore } from "../store";
import { Dispatch } from "redux";
import { disableIneligibleEvents } from "../events/actions";

export function setPlayers(players: IPlayer[]) {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      type: PLAYER_SET_PLAYERS,
      players,
    });
  };
}

export function setActivePlayer(player: IPlayer) {
  return (dispatch: Dispatch): ISetActivePlayer => {
    dispatch(disableIneligibleEvents(player.age));
    return dispatch({
      type: PLAYER_SET_ACTIVE,
      player,
    });
  };
}

export function addPlayer(player: IPlayer) {
  return (dispatch: Dispatch<any>, getState: () => IRootStore) => {
    const activePlayer = getState().players?.activePlayer;
    dispatch({
      type: PLAYER_ADD_PLAYER,
      player,
    });
    if (!activePlayer) {
      return dispatch(setActivePlayer(player));
    }
  };
}
