import React, { useState } from "react";
import { IItem, itemType } from "./types";
import { buildItem } from "./data/items";
import { Text } from "./styled/Text";
import { Label, Form, Input, FormActions, Select } from "./styled/Form";
import { Button } from "./styled/Button";

interface AddEventForm {
  addEvent: (item: IItem) => void;
  handleClose?: () => void;
}

const AddEventForm: React.FC<AddEventForm> = ({ addEvent, handleClose }) => {
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
    addEvent(
      buildItem({ name: values.name, type: values.type, minAge: values.minAge })
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
      <Text tag='h2' variant='h4'>
        Create a Custom Event
      </Text>
      <Label>
        What does the person have to do?
        <Input
          required
          type='text'
          value={values.name}
          onChange={setEventName}
        />
      </Label>
      <Label>
        What type of event is this?
        <Select onChange={setEventType} value={values.type}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.icon}
              {option.name}
            </option>
          ))}
        </Select>
      </Label>
      <FormActions>
        <Button type='submit' size='p' background='good'>
          Submit
        </Button>
        {handleClose && (
          <Button type='button' onClick={handleClose} size='p' background='bad'>
            Nevermind
          </Button>
        )}
      </FormActions>
    </Form>
  );
};

export default React.memo(AddEventForm);
