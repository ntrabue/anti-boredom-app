import { eventReducerState, actions } from "./types";
import {
  EVENT_ADD_EVENT,
  EVENT_REMOVE_EVENT,
  EVENT_TOGGLE_EVENT,
  EVENT_GET_RANDOM_EVENT,
  EVENT_DISABLE_CATEGORY,
  EVENT_ENABLE_CATEGORY,
  EVENT_DISABLE_INELIGIBLE_EVENTS,
  EVENT_SET_EVENTS,
} from "./constants";
import { getRandomIndexFromArray } from "../../utils/getRandIndexFromArray";
import { defaultItems } from "../../data/items";

const initialState: eventReducerState = {
  events: defaultItems,
  eligibleEvents: [],
  selectingEvent: false,
  selectedEvent: null,
};

export function reducer(
  state = initialState,
  action: actions
): eventReducerState {
  switch (action.type) {
    case EVENT_SET_EVENTS: {
      return { ...state, events: action.events };
    }
    case EVENT_ADD_EVENT: {
      return {
        ...state,
        events: [...state.events, action.event],
        eligibleEvents: [...state.eligibleEvents, action.event],
      };
    }
    case EVENT_REMOVE_EVENT: {
      return {
        ...state,
        events: [...state.events.filter((event) => event.id !== action.event)],
        eligibleEvents: [
          ...state.eligibleEvents.filter((event) => event.id !== action.event),
        ],
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
        eligibleEvents: [
          ...state.eligibleEvents.map((event) =>
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

      const newEligibleEvents = state.eligibleEvents.map((event) =>
        event.type === action.category ? { ...event, enabled: false } : event
      );
      return {
        ...state,
        events: newEvents,
        eligibleEvents: newEligibleEvents,
      };
    }
    case EVENT_ENABLE_CATEGORY: {
      const newEvents = state.events.map((event) =>
        event.type === action.category ? { ...event, enabled: true } : event
      );

      const newEligibleEvents = state.eligibleEvents.map((event) =>
        event.type === action.category ? { ...event, enabled: true } : event
      );

      return {
        ...state,
        events: newEvents,
        eligibleEvents: newEligibleEvents,
      };
    }
    case EVENT_GET_RANDOM_EVENT: {
      const enabledEvents = state.eligibleEvents.filter(
        (event) => event.enabled && state.selectedEvent?.id !== event.id
      );
      const randomIndex = getRandomIndexFromArray(enabledEvents);
      return {
        ...state,
        selectingEvent: false,
        selectedEvent: enabledEvents[randomIndex],
      };
    }
    case EVENT_DISABLE_INELIGIBLE_EVENTS: {
      // eslint-disable-next-line array-callback-return
      const newEvents = state.events.filter((event) => {
        const userAge = action.age;
        const userIsTooOld = event.maxAge > 0 && event.maxAge < userAge;
        const userIsTooYoung = event.minAge > 0 && event.minAge > userAge;
        if (!userIsTooOld && !userIsTooYoung) {
          return event;
        }
      });

      return {
        ...state,
        eligibleEvents: newEvents,
        selectedEvent: null,
      };
    }

    default:
      return state;
  }
}
