import React, { useEffect } from "react";
import ThemeProvider from "./styled/ThemeProvider";
import Header from "./layout/Header";
import ReactGA from "react-ga";
import MainContent from "./layout/MainContent";

import { useSelector } from "react-redux";
import { IRootStore } from "./redux/store";

function App() {
  const { events } = useSelector((state: IRootStore) => state.events);

  ReactGA.initialize("UA-48297569-2");
  ReactGA.pageview(window.location.pathname + window.location.search);

  useEffect(() => {
    const localStorageEvents = localStorage.getItem("events");
    const localStorageEventsIsDefined =
      localStorageEvents && localStorageEvents !== "undefined ";
    const stringifiedLocalEvents =
      localStorageEventsIsDefined && JSON.parse(localStorageEvents as string);
    const stringifiedStoreEvents = events && JSON.stringify(events);

    if (stringifiedLocalEvents !== stringifiedStoreEvents)
      localStorage.setItem("events", stringifiedStoreEvents);
  }, [events]);

  return (
    <ThemeProvider>
      {events && (
        <>
          <Header />
          <MainContent />
        </>
      )}
    </ThemeProvider>
  );
}
export default React.memo(App);
