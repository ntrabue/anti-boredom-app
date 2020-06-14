import React from "react";
import { IItem } from "../types";
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
import AddEventForm from "../forms/AddEventForm";

interface AddEventModal {
  addEvent: (item: IItem) => void;
}

const AddEventModal: React.FC<AddEventModal> = ({ addEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variantColor='green' onClick={onOpen}>
        Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add An Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm addEvent={addEvent} handleClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;
