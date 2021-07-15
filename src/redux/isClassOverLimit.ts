import SIClass, { isDominator, SIDominators } from "../models/SIClass";
import { PlayerState } from "./playerState";


type ClassCounts = {
  total: Record<SIClass, number>;
  alive: Record<SIClass, number>;
}
// Future: Add support for custom class limits via cvar (e.g. no spitter)
export default function isClassOverLimit(players: readonly PlayerState[], siClass: SIClass) {
  if ( siClass === SIClass.Witch || siClass === SIClass.Tank) {
    return false;
  }

  const classLimit = 1; // read this from cvar state

  // Count SI classes of all alive & ghost infected
  const classCounts = players
    .reduce<ClassCounts>((acc, next) => {
      if(next.siClass > SIClass.Common && next.siClass < SIClass.Witch) {
        ++acc.total[next.siClass]
        if (next.spawnState !== 'dead') {
          ++acc.alive[next.siClass];
        }
      }
      return acc;
    }, {
      total: [0,0,0,0,0,0,0,0,0,0],
      alive: [0,0,0,0,0,0,0,0,0,0],
    });

  if (classCounts.total[siClass] >= classLimit) {
    return true;
  }
  if (!isDominator(siClass)) {
    // Non-dominators are always allowed.
    return false;
  }
  const dominatorCount = SIDominators.map(c => classCounts.alive[c]).reduce((acc, next) => acc + next, 0);
  // 3 or more dominators, don't allow additional dominators.
  // This is hard-coded in game logic... so we don't get cvar control.
  return dominatorCount > 2;
}