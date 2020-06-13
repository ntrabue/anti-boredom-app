import React from "react";
import { IItem } from "./types";
import { UL, LI } from "./styled/List";
import { Label } from "./styled/Form";

export interface EventsChecklist {
  events: IItem[];
  toggleEvent: (event: IItem) => void;
}

const EventsChecklist: React.FC<EventsChecklist> = ({
  events,
  toggleEvent,
}) => {
  return (
    <UL>
      {events.map((event) => (
        <LI key={event.id}>
          <Label>
            <input
              type='checkbox'
              checked={event.enabled}
              onChange={() => toggleEvent(event)}
            />
            {event.name}
          </Label>
        </LI>
      ))}
    </UL>
  );
};

export default React.memo(EventsChecklist);
