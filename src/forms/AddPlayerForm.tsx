import React, { useState } from "react";
import { Form } from "../styled/Form";
import { IBuildPlayer, buildPlayer } from "../utils/buildPlayer";
import { useDispatch, useSelector } from "react-redux";
import { IRootStore } from "../redux/store";
import { addPlayer } from "../redux/players/actions";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
} from "@chakra-ui/core";

interface IAddPlayerForm {
  onClose: () => void;
}
const AddPlayerForm: React.FC<IAddPlayerForm> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { players } = useSelector((state: IRootStore) => state.players);

  const defaultFormValues: IBuildPlayer = {
    name: "",
    age: 0,
  };

  const [values, setValues] = useState(defaultFormValues);

  const setName = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({ ...values, name: e.currentTarget.value });
  };

  const setAge = (e: React.FormEvent<HTMLInputElement>) => {
    return setValues({ ...values, age: parseInt(e.currentTarget.value, 10) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playersWithSameName = players.filter(
      (player) => player.name === values.name
    ).length;
    // TODO: We should throw an error here
    if (playersWithSameName > 0) {
      return;
    }
    dispatch(addPlayer(buildPlayer(values)));
    return onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor='valueName'>Name:</FormLabel>
          <Input
            type='text'
            id='valueName'
            size='lg'
            isRequired
            value={values.name}
            onChange={setName}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='valueAge'>Age:</FormLabel>
          <Input
            type='number'
            id='valueAge'
            size='lg'
            isRequired
            value={values.age}
            onChange={setAge}
          />
        </FormControl>
        <ButtonGroup spacing={4}>
          <Button variantColor='green' type='submit' size='lg'>
            Submit
          </Button>
          {onClose && players.length > 0 && (
            <Button
              variantColor='red'
              type='button'
              onClick={onClose}
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

export default AddPlayerForm;
