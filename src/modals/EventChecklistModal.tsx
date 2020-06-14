import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/core";
import EventChecklist from "../forms/EventChecklist";
import { IItem } from "../types";

interface EventChecklistModal {
  events: IItem[];
  toggleEvent: (event: IItem) => void;
}

const EventChecklistModal: React.FC<EventChecklistModal> = ({
  events,
  toggleEvent,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enabledEvents = events.filter((event) => event.enabled);
  return (
    <>
      <Button variantColor='red' onClick={onOpen}>
        Active Events: {enabledEvents.length}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disable/Enable Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventChecklist events={events} toggleEvent={toggleEvent} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventChecklistModal;
