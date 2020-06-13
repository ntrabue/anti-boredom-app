import React, { useReducer } from "react";
import { defaultItems } from "./data/items";
import { eventReducerState, IItem } from "./types";
import { eventReducer } from "./eventReducer";

import { ThemeProvider } from "emotion-theming";
import { Global, css } from "@emotion/core";
import theme from "./styled/theme";
import { Button } from "./styled/Button";
import { Text } from "./styled/Text";
import AppHeader from "./AppHeader";
import { AppBody, Advice } from "./styled/Layout";
import { getButtonOption, getWaitingOptions } from "./data/messages";

const secondMS = 1000;
const numberOfSecondsTheyHaveToWait = secondMS * 3;

const defaultEventReducerState: eventReducerState = {
  events: defaultItems,
  selectingEvent: false,
  selectedEvent: null,
};

function App() {
  const [events, setEvents] = useReducer(
    eventReducer,
    defaultEventReducerState
  );

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
      <Global
        styles={css`
          html {
            background-color: ${theme.colors.background.hex};
            color: ${theme.colors.text.hex};
            font-size: ${theme.fontSizes.p};
          }
          body {
            width: 90%;
            display: flex;
            flex-direction: column;
            margin-right: auto;
            margin-left: auto;
          }
        `}
      />
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
