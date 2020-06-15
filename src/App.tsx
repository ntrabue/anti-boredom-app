import React, { useEffect } from "react";
import ThemeProvider from "./styled/ThemeProvider";
import Header from "./layout/Header";
import ReactGA from "react-ga";
import MainContent from "./layout/MainContent";

import { useSelector, useDispatch } from "react-redux";
import { IRootStore } from "./redux/store";
import { disableIneligibleEvents } from "./redux/events/actions";
import useInitializePlayers from "./hooks/useInitializePlayers";
import useInitializeEvents from "./hooks/useInitializeEvents";

function App() {
  const dispatch = useDispatch();
  const { events, eligibleEvents } = useSelector(
    (state: IRootStore) => state.events
  );
  const { activePlayer } = useSelector((state: IRootStore) => state.players);
  const playersInitialized = useInitializePlayers();
  const eventsInitialized = useInitializeEvents();

  const loading =
    !playersInitialized.initialized && !eventsInitialized.initialized;

  ReactGA.initialize("UA-48297569-2");
  ReactGA.pageview(window.location.pathname + window.location.search);

  useEffect(() => {
    if (events && activePlayer && eligibleEvents.length === 0) {
      dispatch(disableIneligibleEvents(activePlayer.age));
    }
  }, [events, eligibleEvents, activePlayer, dispatch]);

  return (
    <ThemeProvider>
      {events &&
        (loading ? (
          <p>loading...</p>
        ) : (
          <>
            <Header />
            <MainContent />
          </>
        ))}
    </ThemeProvider>
  );
}
export default React.memo(App);
