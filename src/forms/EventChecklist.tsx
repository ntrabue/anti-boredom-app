import React from "react";
import { IItem } from "../types";
import { Stack, Switch, FormLabel, Grid } from "@chakra-ui/core";

export interface EventsChecklist {
  events: IItem[];
  toggleEvent: (event: IItem) => void;
}

const EventsChecklist: React.FC<EventsChecklist> = ({
  events,
  toggleEvent,
}) => {
  return (
    <Stack spacing={3}>
      {events.map((event) => (
        <Grid templateColumns='1fr 6fr' alignItems='center' gap={2}>
          <Switch
            id={event.id}
            defaultIsChecked={event.enabled}
            onChange={() => toggleEvent(event)}
          />
          <FormLabel htmlFor={event.id}>{event.name}</FormLabel>
        </Grid>
      ))}
    </Stack>
  );
};

export default React.memo(EventsChecklist);
