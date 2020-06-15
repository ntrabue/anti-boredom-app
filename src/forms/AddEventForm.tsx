import React, { useState } from "react";
import { IItem, itemType } from "../types";
import { buildItem } from "../data/items";
import { Form } from "../styled/Form";
import {
  Button,
  ButtonGroup,
  Text,
  Input,
  Stack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/events/actions";

interface AddEventForm {
  handleClose?: () => void;
}

const AddEventForm: React.FC<AddEventForm> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultFormValues: IItem = {
    id: "",
    name: "",
    minAge: 0,
    type: "fun",
    enabled: true,
    icon: "😕",
  };

  const [values, setValues] = useState(defaultFormValues);

  const setEventName = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({ ...values, name: e.currentTarget.value });
  };

  const setEventType = (e: React.FormEvent<HTMLSelectElement>) => {
    return setValues({ ...values, type: e.currentTarget.value as itemType });
  };

  // TODO: check if there is an event with that value already and decline if so
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addEvent(
        buildItem({
          name: values.name,
          type: values.type,
          minAge: values.minAge,
        })
      )
    );
    return setValues({ ...values, name: "" });
  };
  interface typeSelectOptions {
    name: string;
    value: itemType;
    icon: string;
  }

  const options: typeSelectOptions[] = [
    { name: "Fun", value: "fun", icon: "😀" },
    {
      name: "Cleaning",
      value: "clean",
      icon: "🧹",
    },
    {
      name: "Learning",
      value: "learning",
      icon: "🙋‍♀️",
    },
    { name: "Punishment", value: "punishment", icon: "😞" },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Text fontSize='xl'>Create a Custom Event</Text>

      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='valueDescription'>
            What does the person have to do?
          </FormLabel>
          <Input
            id='valueDescription'
            size='lg'
            isRequired
            type='text'
            value={values.name}
            onChange={setEventName}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='eventType'>What type of event is this?</FormLabel>
          <Select
            id='eventType'
            size='lg'
            onChange={setEventType}
            value={values.type}
            isRequired
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.icon}
                {option.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup spacing={4}>
          <Button variantColor='green' type='submit' size='lg'>
            Submit
          </Button>
          {handleClose && (
            <Button
              variantColor='red'
              type='button'
              onClick={handleClose}
              size='lg'
            >
              Nevermind
            </Button>
          )}
        </ButtonGroup>
      </Stack>
    </Form>
  );
};

export default React.memo(AddEventForm);
