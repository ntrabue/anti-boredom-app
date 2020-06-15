import React, { useState, useEffect } from "react";
import { IItem, itemType } from "../redux/events/types";
import { buildItem } from "../utils/buildItem";
import { Form } from "../styled/Form";
import {
  Button,
  ButtonGroup,
  Input,
  Stack,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Grid,
  Text,
  FormHelperText,
} from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../redux/events/actions";
import { IRootStore } from "../redux/store";

interface AddEventForm {
  handleClose?: () => void;
}

const AddEventForm: React.FC<AddEventForm> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { activePlayer } = useSelector((state: IRootStore) => state.players);
  const defaultFormValues: IItem = {
    id: "",
    name: "",
    minAge: 0,
    maxAge: 0,
    type: "fun",
    enabled: true,
    icon: "😕",
  };

  const [values, setValues] = useState(defaultFormValues);
  const [ageError, setAgeError] = useState("");
  useEffect(() => {
    if (values.maxAge !== 0 && values.minAge > values.maxAge) {
      setAgeError("Minimum age cannot be lower than maximum age");
    } else if (activePlayer && values.minAge > activePlayer.age) {
      setAgeError("You can't create an event for people older than yourself");
    } else {
      setAgeError("");
    }
  }, [values.minAge, values.maxAge, activePlayer]);

  const setEventName = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({ ...values, name: e.currentTarget.value });
  };

  const setEventType = (e: React.FormEvent<HTMLSelectElement>) => {
    return setValues({ ...values, type: e.currentTarget.value as itemType });
  };

  const setMinAge = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({
      ...values,
      minAge: parseInt(e.currentTarget.value, 10),
    });
  };

  const setMaxAge = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({
      ...values,
      maxAge: parseInt(e.currentTarget.value, 10),
    });
  };

  // TODO: check if there is an event with that value already and decline if so
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ageError) return;
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
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='valueDescription'>
            What does the person have to do?
          </FormLabel>
          <Textarea
            id='valueDescription'
            size='lg'
            isRequired
            type='text'
            maxLength={200}
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
        <Grid templateColumns='1fr 1fr' columnGap={2}>
          <FormControl>
            <FormLabel htmlFor='eventMinAge'>Minimum Age:</FormLabel>
            <Input
              type='number'
              id='eventMinAge'
              size='lg'
              onChange={setMinAge}
              value={values.minAge}
            />
            <FormHelperText>0 means there is no minimum age</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='eventMaxAge'>Max Age:</FormLabel>
            <Input
              type='number'
              id='eventMaxAge'
              size='lg'
              onChange={setMaxAge}
              value={values.maxAge}
            />
            <FormHelperText>0 means there is no max age</FormHelperText>
          </FormControl>
          {ageError && (
            <Text fontWeight='bold' color='red.300' gridColumn='1 / span 2'>
              {ageError}
            </Text>
          )}
        </Grid>

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
