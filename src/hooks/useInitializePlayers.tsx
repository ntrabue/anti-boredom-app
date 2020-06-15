import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootStore } from "../redux/store";
import { setActivePlayer, setPlayers } from "../redux/players/actions";

const useInitializePlayers = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { players, activePlayer } = useSelector(
    (state: IRootStore) => state.players
  );
  const playersFromLocalStorage = localStorage.getItem("players");
  const activePlayerFromStorage = localStorage.getItem("active-player");

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    if (activePlayer) {
      localStorage.setItem("active-player", JSON.stringify(activePlayer));
    }
  }, [activePlayer]);

  useEffect(() => {
    if (playersFromLocalStorage && players.length === 0) {
      dispatch(setPlayers(JSON.parse(playersFromLocalStorage)));
    }
    setInitialized(true);
  }, [dispatch, players, playersFromLocalStorage]);

  useEffect(() => {
    if (activePlayerFromStorage && !activePlayer) {
      dispatch(setActivePlayer(JSON.parse(activePlayerFromStorage)));
    }
    setInitialized(true);
  }, [activePlayer, activePlayerFromStorage, dispatch]);

  return { initialized };
};

export default useInitializePlayers;
