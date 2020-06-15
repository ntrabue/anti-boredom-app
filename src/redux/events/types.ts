export type itemType = "fun" | "clean" | "learning" | "punishment";
export interface IItem {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  type: itemType;
  enabled: boolean;
  icon: string;
}

export interface eventReducerState {
  events: IItem[];
  eligibleEvents: IItem[];
  selectingEvent: boolean;
  selectedEvent: IItem | null;
}

export interface ISetEvents {
  type: "events/set-events";
  events: IItem[];
}

export interface IAddEvent {
  type: "events/add-event";
  event: IItem;
}

export interface IRemoveEvent {
  type: "events/remove-event";
  event: string;
}

export interface IGetRandomEvent {
  type: "events/get-random-event";
}

export interface IEnableCategory {
  type: "events/enable-category";
  category: itemType;
}

export interface IDisableCategory {
  type: "events/disable-category";
  category: itemType;
}

export interface IToggleEvent {
  type: "events/toggle-event";
  event: string;
}

export interface IDisableIneligibleEvents {
  type: "events/disable-ineligible-events";
  age: number;
}

export type actions =
  | ISetEvents
  | IAddEvent
  | IRemoveEvent
  | IGetRandomEvent
  | IEnableCategory
  | IDisableCategory
  | IToggleEvent
  | IDisableIneligibleEvents;
