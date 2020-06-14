import React from "react";
import { HeaderWrapper } from "../styled/Layout";
import { IItem } from "../types";
import EventChecklistModal from "../modals/EventChecklistModal";
import AddEventModal from "../modals/AddEventModal";

interface AppHeader {
  addEvent: (item: IItem) => void;
  toggleEvent: (event: IItem) => void;
  events: IItem[];
}
const Header: React.FC<AppHeader> = ({ addEvent, events, toggleEvent }) => {
  return (
    <HeaderWrapper>
      <AddEventModal addEvent={addEvent} />
      <EventChecklistModal events={events} toggleEvent={toggleEvent} />
    </HeaderWrapper>
  );
};
export default React.memo(Header);
