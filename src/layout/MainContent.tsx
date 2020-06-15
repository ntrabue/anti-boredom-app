import React from "react";
import { getButtonOption, getWaitingOptions } from "../data/messages";
import { Button, Text, Flex, Box } from "@chakra-ui/core";
import { AppBody, Advice } from "../styled/Layout";
import { FaRobot } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { IRootStore } from "../redux/store";
import { getRandomEvent } from "../redux/events/actions";

const MainContent: React.FC = () => {
  const dispatch = useDispatch();
  const { events, selectedEvent, selectingEvent } = useSelector(
    (state: IRootStore) => state.events
  );
  const activeEvents = events.filter((event) => event.enabled);
  const buttonContent =
    activeEvents.length === 0 ? "There are no options" : getButtonOption();
  return (
    <AppBody>
      <Flex direction='row' alignItems='center'>
        <Text fontSize='6xl' as='span'>
          B
        </Text>
        <Box fontSize='6xl' as={FaRobot} />
        <Text fontSize='6xl' as='span'>
          red Bot
        </Text>
      </Flex>

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
        onClick={() => dispatch(getRandomEvent())}
        isLoading={selectingEvent}
        loadingText='One sec...'
      >
        {buttonContent}
      </Button>
    </AppBody>
  );
};

export default MainContent;
