import { IPlayerReducer, playerActions } from "./types";
import {
  PLAYER_ADD_PLAYER,
  PLAYER_SET_ACTIVE,
  PLAYER_SET_PLAYERS,
} from "./constants";

const initialState: IPlayerReducer = {
  players: [],
  activePlayer: null,
};

export function reducer(
  state = initialState,
  action: playerActions
): IPlayerReducer {
  switch (action.type) {
    case PLAYER_SET_PLAYERS: {
      return { ...state, players: action.players };
    }
    case PLAYER_ADD_PLAYER: {
      return {
        ...state,
        players: [...state.players, action.player],
      };
    }
    case PLAYER_SET_ACTIVE: {
      return { ...state, activePlayer: action.player };
    }
    default:
      return state;
  }
}
