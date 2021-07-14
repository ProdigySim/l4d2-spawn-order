import SIClass, { rotateSIListTo } from "../models/SIClass";
import isClassOverLimit from "./isClassOverLimit";
import { PlayerState } from "./playerState";

export default function determineNextSpawn(gameState: { players: readonly PlayerState[], spawnSeed: SIClass }, player: PlayerState) {
  let highestTimestamp = 99999;
  let targetClass = SIClass.Hunter;
  let defaultClass = true;
  for(const siClass of rotateSIListTo(gameState.spawnSeed)) {
    const lastSpawnedAsClassTimestamp = player.classTimestamps[siClass];
    // Double check: conflicting timestamps take which SI? Should be the first one found...
    if (lastSpawnedAsClassTimestamp < highestTimestamp) {
      if(!isClassOverLimit(gameState.players, siClass)) {
        targetClass = siClass;
        highestTimestamp = lastSpawnedAsClassTimestamp;
        defaultClass = false;
      }
    }
  }
  if (defaultClass) {
    console.warn('Next spawn defaulted to Hunter because of no available options!!!');
  }
  return targetClass;
}
