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
import { useSelector } from "react-redux";
import { IRootStore } from "../redux/store";

const EventChecklistModal: React.FC = () => {
  const { eligibleEvents } = useSelector((state: IRootStore) => state.events);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const enabledEvents = eligibleEvents.filter((event) => event.enabled);
  return (
    <>
      <Button variantColor='pink' onClick={onOpen}>
        Active Events: {enabledEvents.length}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disable/Enable Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventChecklist />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventChecklistModal;
