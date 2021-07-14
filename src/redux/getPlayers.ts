import { createSelector } from "@reduxjs/toolkit";
import { GameState } from "./gameStateSlice";

const getPlayers = createSelector(
  (state: GameState) => state.orderedPlayers,
  (state: GameState) => state.playersById,
  (orderedIds, byId) => orderedIds.map((i) => byId[i]),
);

export default getPlayers;