import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootStore } from "../redux/store";
import { setEvents } from "../redux/events/actions";

const useInitializeEvents = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { events } = useSelector((state: IRootStore) => state.events);
  const eventsFromLocalStorage = localStorage.getItem("events");

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    if (eventsFromLocalStorage && events.length === 0) {
      dispatch(setEvents(JSON.parse(eventsFromLocalStorage)));
    }
    setInitialized(true);
  }, [eventsFromLocalStorage, dispatch, events.length]);

  return { initialized };
};

export default useInitializeEvents;
