import React, { useReducer, useEffect } from "react";
import { defaultItems } from "./data/items";
import { eventReducerState, IItem } from "./types";
import { eventReducer } from "./eventReducer";

import { ThemeProvider } from "emotion-theming";
import theme from "./styled/theme";
import { Button } from "./styled/Button";
import { Text } from "./styled/Text";
import AppHeader from "./AppHeader";
import { AppBody, Advice } from "./styled/Layout";
import { getButtonOption, getWaitingOptions } from "./data/messages";
import GlobalStyles from "./styled/GlobalStyles";
import ReactGA from "react-ga";

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

  ReactGA.initialize("UA-000000-01");
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

  const activeEvents = events.events.filter((event) => event.enabled);
  const buttonContent =
    activeEvents.length === 0
      ? "There are no options"
      : events.selectingEvent
      ? "One sec..."
      : getButtonOption();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppHeader
        events={events.events}
        addEvent={addEvent}
        toggleEvent={toggleEvent}
      />
      <AppBody>
        <Text tag='h1'>Anti-Boredom Bot</Text>
        <Advice>
          <Text tag='h3'>
            {events.selectingEvent
              ? getWaitingOptions()
              : events.selectedEvent
              ? `${events.selectedEvent.name} ${events.selectedEvent.icon}`
              : "Click the button below to cure your boredom"}
          </Text>
        </Advice>

        <Button
          background={activeEvents.length === 0 ? "bad" : "good"}
          size='h2'
          onClick={findSomething}
          disabled={events.selectingEvent || activeEvents.length === 0}
        >
          {buttonContent}
        </Button>
      </AppBody>
    </ThemeProvider>
  );
}
export default React.memo(App);
