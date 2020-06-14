import React from "react";
import { getButtonOption, getWaitingOptions } from "../data/messages";
import { IItem } from "../types";
import { Button, Text, Flex, Icon, Box } from "@chakra-ui/core";
import { AppBody, Advice } from "../styled/Layout";
import { FaRobot } from "react-icons/fa";

interface MainContent {
  selectedEvent: IItem | null;
  events: IItem[];
  selectingEvent: boolean;
  findSomething: () => void;
}

const MainContent: React.FC<MainContent> = ({
  selectedEvent,
  events,
  findSomething,
  selectingEvent,
}) => {
  const activeEvents = events.filter((event) => event.enabled);
  const buttonContent =
    activeEvents.length === 0 ? "There are no options" : getButtonOption();
  return (
    <AppBody>
      <Text fontSize='6xl'>
        <Flex direction='row' alignItems='center'>
          B<Box as={FaRobot} />
          redB
          <Box as={FaRobot} />
          t.app
        </Flex>
      </Text>

      <Advice>
        <Text fontSize='4xl'>
          {selectingEvent
            ? getWaitingOptions()
            : selectedEvent
            ? `${selectedEvent.name} ${selectedEvent.icon}`
            : "Click the button below to cure your boredom"}
        </Text>
      </Advice>

      <Button
        variantColor='green'
        size='lg'
        onClick={findSomething}
        isLoading={selectingEvent}
        loadingText='One sec...'
      >
        {buttonContent}
      </Button>
    </AppBody>
  );
};

export default MainContent;
