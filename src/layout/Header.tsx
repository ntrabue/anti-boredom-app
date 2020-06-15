import React from "react";
import { HeaderWrapper } from "../styled/Layout";
import EventChecklistModal from "../modals/EventChecklistModal";
import AddEventModal from "../modals/AddEventModal";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <AddEventModal />
      <EventChecklistModal />
    </HeaderWrapper>
  );
};
export default React.memo(Header);
