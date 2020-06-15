import React, { useEffect } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IRootStore } from "../redux/store";
import AddPlayerForm from "../forms/AddPlayerForm";
import { setActivePlayer } from "../redux/players/actions";

interface IPlayerDropDown {
  onOpen: () => void;
}
const PlayerDropDown: React.FC<IPlayerDropDown> = ({ onOpen }) => {
  const dispatch = useDispatch();
  const { players, activePlayer } = useSelector(
    (state: IRootStore) => state.players
  );

  if (players.length === 0)
    return (
      <Button variantColor='orange' onClick={onOpen}>
        Add A Player
      </Button>
    );

  return (
    <Menu>
      <MenuButton>
        <Button variantColor='orange' rightIcon='chevron-down'>
          {activePlayer?.name}
        </Button>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {players.map((player) => (
            <MenuItem
              key={player.id}
              onClick={() => dispatch(setActivePlayer(player))}
            >
              {player.name}
            </MenuItem>
          ))}
          <MenuGroup>
            <MenuItem onClick={onOpen}>Add A Player</MenuItem>
          </MenuGroup>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const AddPlayerModal: React.FC = () => {
  const { players } = useSelector((state: IRootStore) => state.players);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (players.length === 0) {
      onOpen();
    }
  }, [onOpen, players]);

  return (
    <>
      <PlayerDropDown onOpen={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPlayerForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPlayerModal;
