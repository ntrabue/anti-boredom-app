import React, { useEffect } from "react";
import { HeaderWrapper } from "../styled/Layout";
import EventChecklistModal from "../modals/EventChecklistModal";
import AddEventModal from "../modals/AddEventModal";
import AddPlayerModal from "../modals/AddPlayerModal";
import { useColorMode } from "@chakra-ui/core";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, [toggleColorMode, colorMode]);

  return (
    <HeaderWrapper>
      <AddEventModal />
      <EventChecklistModal />
      <AddPlayerModal />
    </HeaderWrapper>
  );
};
export default React.memo(Header);
