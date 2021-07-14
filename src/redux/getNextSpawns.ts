import { createSelector } from "reselect";
import SIClass from "../models/SIClass";
import determineNextSpawn from "./determineNextSpawn";
import { GameState } from "./gameStateSlice";
import getPlayers from "./getPlayers";


const getNextSpawns = createSelector(
  getPlayers,
  (state: GameState) => state.spawnSeed,
  (players, spawnSeed) => Object.fromEntries(
    players.map((p) => [p.id, determineNextSpawn({ players, spawnSeed }, p)] as const),
  ) as Record<number, SIClass>,
);

export default getNextSpawns;