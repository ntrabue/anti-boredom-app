import { v4 as uuidv4 } from "uuid";
import { IPlayer } from "../redux/players/types";

export interface IBuildPlayer {
  name: string;
  age: number;
}

export function buildPlayer({ name, age }: IBuildPlayer): IPlayer {
  return {
    id: uuidv4(),
    name,
    age,
  };
}
