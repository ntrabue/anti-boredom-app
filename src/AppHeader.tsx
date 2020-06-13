import React, { useState } from "react";
import { Modal } from "./styled/Modal";
import { AiFillPlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { Header } from "./styled/Layout";
import AddEventForm from "./AddEventForm";
import EventsChecklist from "./EventChecklist";
import { IItem } from "./types";
import { Button } from "./styled/Button";

interface AppHeader {
  addEvent: (item: IItem) => void;
  toggleEvent: (event: IItem) => void;
  events: IItem[];
}
const AppHeader: React.FC<AppHeader> = ({ addEvent, events, toggleEvent }) => {
  const [addEventFormVisible, toggleEventForm] = useState(false);
  const [eventChecklistVisible, toggleEventChecklist] = useState(false);

  const enabledEvents = events.filter((event) => event.enabled);
  return (
    <Header>
      <Modal
        toggle={
          <Button
            background='good'
            size='p'
            onClick={() => toggleEventForm(true)}
          >
            <AiFillPlusCircle />
            Add
          </Button>
        }
        visible={addEventFormVisible}
        handleClose={() => toggleEventForm(false)}
      >
        <AddEventForm
          addEvent={addEvent}
          handleClose={() => toggleEventForm(false)}
        />
      </Modal>
      <Modal
        toggle={
          <Button
            background='bad'
            size='p'
            onClick={() => toggleEventChecklist(true)}
          >
            <AiOutlineUnorderedList />
            {enabledEvents.length}
          </Button>
        }
        handleClose={() => toggleEventChecklist(false)}
        visible={eventChecklistVisible}
      >
        <EventsChecklist events={events} toggleEvent={toggleEvent} />
      </Modal>
    </Header>
  );
};
export default React.memo(AppHeader);
