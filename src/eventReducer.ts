import { eventReducerState, actions, IItem } from "./types";

export function eventReducer(
  state: eventReducerState,
  action: actions
): eventReducerState {
  switch (action.type) {
    case "addEvent": {
      const newEventArray = [...state.events, action.event];

      return { ...state, events: newEventArray };
    }
    case "toggleEvent": {
      const newEvents = state.events.map((event) => {
        return event.id === action.value
          ? { ...event, enabled: !event.enabled }
          : event;
      });
      return { ...state, selectedEvent: null, events: newEvents };
    }
    case "removeEvent":
      return state;

    case "gettingEvent":
      return { ...state, selectingEvent: action.value };
    case "getRandomEvent":
      let enabledEvents = state.events.filter((event) => event.enabled);
      if (state.selectedEvent) {
        enabledEvents = enabledEvents.filter(
          (event) => event.id !== (state.selectedEvent as IItem).id
        );
      }

      const getIndex: number = Math.floor(
        Math.random() * Math.floor(enabledEvents.length)
      );
      return {
        ...state,
        selectingEvent: false,
        selectedEvent: enabledEvents[getIndex],
      };
    default:
      throw new Error();
  }
}
