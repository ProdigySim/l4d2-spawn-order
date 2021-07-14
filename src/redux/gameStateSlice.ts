import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import SIClass from "../models/SIClass";
import assertDefined from "../utils/assertDefined";
import determineNextSpawn from "./determineNextSpawn";
import getPlayers from "./getPlayers";
import { PlayerNames, PlayerState, vendNewPlayer } from './playerState';

function rndSeed(): SIClass {
  return Math.floor(Math.random() * 6) + 1;
}
function consumeRandomItem<T>(arr:T[]): T | undefined {
  if(arr.length < 2) {
    // 0: return undefined
    // 1: return first item.
    return arr.pop();
  }
  const targetIdx = Math.floor(Math.random() * arr.length);
  return arr.splice(targetIdx)[0];
}
const slice = createSlice({
  name: 'GameState',
  initialState: {
    availablePlayerNames: PlayerNames,
    playersById: {} as Record<number, PlayerState>,
    orderedPlayers: [] as number[],
    spawnSeed: rndSeed(),
    curTime: 0, // Fake game clock, we will always increment this on any gamestate advancing action.
  },
  reducers: {
    addPlayer(state) {
      const name = consumeRandomItem(state.availablePlayerNames) ?? 'PLAYER';
      const player = vendNewPlayer(name);
      state.playersById[player.id] = player;
      state.orderedPlayers.push(player.id);
    },
    removePlayer(state) {
      const playerId = state.orderedPlayers.pop();
      assertDefined(playerId, 'No players found to remove');
      const player = state.playersById[playerId];
      delete state.playersById[playerId];
      state.availablePlayerNames.push(player.name);
    },
    setSpawnSeed(state, action: PayloadAction<number>) {
      console.assert(action.payload > 0 && action.payload < 7, "Spawn seed out of bounds.");
      state.spawnSeed = action.payload;
    },
    rerollSpawnSeed(state) {
      state.spawnSeed = rndSeed();
    },
    spawnPlayer(state, action: PayloadAction<number>) {
      const player = state.playersById[action.payload];
      assertDefined(player, `Couldn't find player ${action.payload} to spawn.`);
      console.assert(player.spawnState === 'dead', `Player ${action.payload} is not dead`);
      const nextSI = determineNextSpawn({ players: getPlayers(state), spawnSeed: state.spawnSeed }, player);
      player.siClass = nextSI;
      player.classTimestamps[nextSI] = ++state.curTime;
      player.spawnState = 'ghost';
    },
    killPlayer(state, action: PayloadAction<number>) {
      const player = state.playersById[action.payload];
      assertDefined(player, `Couldn't find player ${action.payload} to spawn.`);
      ++state.curTime
      player.siClass = SIClass.Common;
      player.spawnState = 'dead';
    }
  }
});

export const reducer = slice.reducer;

export const gameStateActions = {
  ...slice.actions,
  populateGame: createAsyncThunk(
    'gameState/addNewPlayerAndSpawn',
    async (playerCount: number, { dispatch, getState }) => {
      while(playerCount--) {
        await dispatch(slice.actions.addPlayer());
      }
      const players = getPlayers(getState() as GameState);
      for (const player of players) {
        await dispatch(slice.actions.spawnPlayer(player.id));
      }
    })
};



export type GameState = typeof slice extends Slice<infer U, any> ? U : never;
