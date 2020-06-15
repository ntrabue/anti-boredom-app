import { eventReducerState, actions } from "../../types";
import {
  EVENT_ADD_EVENT,
  EVENT_REMOVE_EVENT,
  EVENT_TOGGLE_EVENT,
  EVENT_GET_RANDOM_EVENT,
  EVENT_DISABLE_CATEGORY,
  EVENT_ENABLE_CATEGORY,
} from "./constants";
import { getRandomIndexFromArray } from "../../utils/getRandIndexFromArray";
import { defaultItems } from "../../data/items";

const eventsFromLocalStorage = localStorage.getItem("events");
const parsedEventsFromStorage =
  eventsFromLocalStorage !== "undefined" &&
  JSON.parse(eventsFromLocalStorage as string);

const initialState: eventReducerState = {
  events: parsedEventsFromStorage || defaultItems,
  selectingEvent: false,
  selectedEvent: null,
};

export function reducer(
  state = initialState,
  action: actions
): eventReducerState {
  switch (action.type) {
    case EVENT_ADD_EVENT: {
      return { ...state, events: [...state.events, action.event] };
    }
    case EVENT_REMOVE_EVENT: {
      return {
        ...state,
        events: [...state.events.filter((event) => event.id !== action.event)],
      };
    }
    case EVENT_TOGGLE_EVENT: {
      return {
        ...state,
        events: [
          ...state.events.map((event) =>
            event.id === action.event
              ? { ...event, enabled: !event.enabled }
              : event
          ),
        ],
      };
    }
    case EVENT_DISABLE_CATEGORY: {
      const newEvents = state.events.map((event) =>
        event.type === action.category ? { ...event, enabled: false } : event
      );
      return {
        ...state,
        events: newEvents,
      };
    }
    case EVENT_ENABLE_CATEGORY: {
      const newEvents = state.events.map((event) =>
        event.type === action.category ? { ...event, enabled: true } : event
      );

      return {
        ...state,
        events: newEvents,
      };
    }
    case EVENT_GET_RANDOM_EVENT: {
      const enabledEvents = state.events.filter((event) => event.enabled);
      const randomIndex = getRandomIndexFromArray(enabledEvents);
      return {
        ...state,
        selectingEvent: false,
        selectedEvent: enabledEvents[randomIndex],
      };
    }

    default:
      return state;
  }
}
