import React, { useReducer, useEffect } from "react";
import { defaultItems } from "./data/items";
import { eventReducerState, IItem } from "./types";
import { eventReducer } from "./eventReducer";
import ThemeProvider from "./styled/ThemeProvider";
import Header from "./layout/Header";
import ReactGA from "react-ga";
import MainContent from "./layout/MainContent";

const secondMS = 1000;
const numberOfSecondsTheyHaveToWait = secondMS * 3;
const eventsFromLocalStorage = JSON.parse(
  localStorage.getItem("events") as string
);
const defaultEventReducerState: eventReducerState = {
  events: eventsFromLocalStorage || defaultItems,
  selectingEvent: false,
  selectedEvent: null,
};

function App() {
  const [events, setEvents] = useReducer(
    eventReducer,
    defaultEventReducerState
  );

  ReactGA.initialize("UA-48297569-2");
  ReactGA.pageview(window.location.pathname + window.location.search);

  useEffect(() => {
    const currentItems = localStorage.getItem("events");
    const stringifiedEvents = JSON.stringify(events.events);
    if (currentItems !== stringifiedEvents)
      localStorage.setItem("events", stringifiedEvents);
  }, [events]);

  const fetchEvents = () => setEvents({ type: "gettingEvent", value: true });
  const getEvent = () => setEvents({ type: "getRandomEvent" });
  const addEvent = (item: IItem) => {
    return setEvents({ type: "addEvent", event: item });
  };
  const toggleEvent = (event: IItem) =>
    setEvents({
      type: "toggleEvent",
      value: event.id,
    });

  const findSomething = () => {
    fetchEvents();
    return setTimeout(getEvent, numberOfSecondsTheyHaveToWait);
  };

  return (
    <ThemeProvider>
      <Header
        events={events.events}
        addEvent={addEvent}
        toggleEvent={toggleEvent}
      />
      <MainContent
        events={events.events}
        selectedEvent={events.selectedEvent}
        selectingEvent={events.selectingEvent}
        findSomething={findSomething}
      />
    </ThemeProvider>
  );
}
export default React.memo(App);
