import React from "react";
import {
  Stack,
  Switch,
  FormLabel,
  Grid,
  Text,
  Box,
  Button,
  IconButton,
  Flex,
  ButtonGroup,
} from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IRootStore } from "../redux/store";
import {
  toggleEvent,
  removeEvent,
  disableCategory,
  enableCategory,
} from "../redux/events/actions";
import { itemType } from "../types";
import { toTitleCase } from "../utils/toTitleCase";
import { FaTrash } from "react-icons/fa";

const EventsChecklist: React.FC = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: IRootStore) => state.events);
  const categories = events.map((event) => event.type);
  const uniqueCategories = categories.filter(
    (item, index) => categories.indexOf(item) === index
  );
  return (
    <Stack spacing={3}>
      {uniqueCategories.map((category: itemType) => (
        <Box key={category}>
          <Flex justifyContent='space-between' alignItems='center'>
            <Text fontSize='2xl' as='h3'>
              {toTitleCase(category)}
            </Text>
            <ButtonGroup>
              <Button
                variantColor='red'
                size='xs'
                onClick={() => dispatch(disableCategory(category))}
              >
                disable
              </Button>
              <Button
                variantColor='green'
                size='xs'
                onClick={() => dispatch(enableCategory(category))}
              >
                enable
              </Button>
            </ButtonGroup>
          </Flex>

          {events
            .filter((event) => event.type === category)
            .map((event) => (
              <Grid
                templateColumns='1fr 6fr 1fr'
                alignItems='center'
                justifyContent='center'
                gap={2}
                key={event.id}
              >
                <Switch
                  id={event.id}
                  isChecked={event.enabled}
                  onChange={() => dispatch(toggleEvent(event.id))}
                />
                <FormLabel htmlFor={event.id}>{event.name}</FormLabel>
                <IconButton
                  aria-label={event.id}
                  variantColor='red'
                  onClick={() => dispatch(removeEvent(event.id))}
                  icon={FaTrash}
                />
              </Grid>
            ))}
        </Box>
      ))}
    </Stack>
  );
};

export default React.memo(EventsChecklist);
