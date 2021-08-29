import { createSelector } from "@reduxjs/toolkit";
import SIClass, { allStandardSIOrdered, rotateSIListTo, StandardSIClass } from "../models/SIClass";
import { GameState } from "./gameStateSlice";
import getPlayers from "./getPlayers";
import isClassOverLimit from "./isClassOverLimit";
import { PlayerState } from "./playerState";

export type SpawnCandidateClassInfo = {
  siClass: StandardSIClass;
  timestamp: number;
  isAliveAs: boolean;
  isDeadAs: boolean;
  isOverLimit: boolean;
  isNextSpawnCandidate: boolean;
};

function getPlayerSpawnList(gameState: { players: readonly PlayerState[], spawnSeed: SIClass }, player: PlayerState): SpawnCandidateClassInfo[] {
  let foundFirstSpawnCandidate = false;
  return rotateSIListTo(gameState.spawnSeed).map((siClass) => (
    [siClass, player.classTimestamps[siClass]] as const
  )).sort(([_, timestampA], [__, timestampB]) => timestampA - timestampB)
  .map(([siClass, timestamp]) => ({
    siClass,
    timestamp,
    isAliveAs: player.siClass === siClass && player.spawnState !== 'dead',
    isDeadAs: player.siClass === siClass && player.spawnState === 'dead',
    isOverLimit: isClassOverLimit(gameState.players, siClass), 
  })).map(info => {
    const isNextSpawnCandidate = !foundFirstSpawnCandidate && !info.isOverLimit && !info.isAliveAs;
    if (isNextSpawnCandidate) {
      foundFirstSpawnCandidate = true;
    }
    return {
      ...info,
      isNextSpawnCandidate: isNextSpawnCandidate,
    };
  })
}

const getPlayerSpawnLists = createSelector(
  getPlayers,
  (state: GameState) => state.spawnSeed,
  (players, spawnSeed) => Object.fromEntries(
    players.map((p) => [p.id, getPlayerSpawnList({ players, spawnSeed }, p)] as const),
  ) as Record<number, SpawnCandidateClassInfo[]>,
);

export default getPlayerSpawnLists;