import {
  EVENT_ADD_EVENT,
  EVENT_REMOVE_EVENT,
  EVENT_TOGGLE_EVENT,
  EVENT_GET_RANDOM_EVENT,
  EVENT_DISABLE_CATEGORY,
  EVENT_ENABLE_CATEGORY,
} from "./constants";
import {
  IItem,
  itemType,
  IToggleEvent,
  IGetRandomEvent,
  IAddEvent,
  IRemoveEvent,
  IDisableCategory,
  IEnableCategory,
} from "../../types";

export function addEvent(event: IItem): IAddEvent {
  return {
    type: EVENT_ADD_EVENT,
    event,
  };
}

export function removeEvent(eventID: string): IRemoveEvent {
  return {
    type: EVENT_REMOVE_EVENT,
    event: eventID,
  };
}

export function toggleEvent(eventID: string): IToggleEvent {
  return {
    type: EVENT_TOGGLE_EVENT,
    event: eventID,
  };
}

export function disableCategory(category: itemType): IDisableCategory {
  return {
    type: EVENT_DISABLE_CATEGORY,
    category: category,
  };
}

export function enableCategory(category: itemType): IEnableCategory {
  return {
    type: EVENT_ENABLE_CATEGORY,
    category: category,
  };
}

export function getRandomEvent(): IGetRandomEvent {
  return {
    type: EVENT_GET_RANDOM_EVENT,
  };
}
