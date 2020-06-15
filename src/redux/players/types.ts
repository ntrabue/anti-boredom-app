export interface IPlayer {
  id: string;
  name: string;
  age: number;
}

export interface IPlayerReducer {
  players: IPlayer[];
  activePlayer: IPlayer | null;
}

export interface ISetPlayers {
  type: "player/set-players";
  players: IPlayer[];
}

export interface IAddPlayer {
  type: "player/add-player";
  player: IPlayer;
}

export interface ISetActivePlayer {
  type: "player/set-active";
  player: IPlayer;
}

export type playerActions = ISetPlayers | IAddPlayer | ISetActivePlayer;
