import { defaultItems } from "./data/items";

export type itemType = "fun" | "clean" | "learning" | "punishment";
export interface IItem {
  id: string;
  name: string;
  minAge: number;
  type: itemType;
  enabled: boolean;
  icon: string;
}

export interface eventReducerState {
  events: IItem[];
  selectingEvent: boolean;
  selectedEvent: IItem | null;
}

interface addEvent {
  type: "addEvent";
  event: IItem;
}

interface removeEvent {
  type: "removeEvent";
  event: string;
}

interface getRandomEvent {
  type: "getRandomEvent";
}

interface gettingEvent {
  type: "gettingEvent";
  value: boolean;
}

interface toggleEvent {
  type: "toggleEvent";
  value: string;
}

export type actions =
  | addEvent
  | removeEvent
  | getRandomEvent
  | gettingEvent
  | toggleEvent;
