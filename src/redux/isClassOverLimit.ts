import SIClass, { isDominator, SIDominators } from "../models/SIClass";
import { PlayerState } from "./playerState";

// Future: Add support for custom class limits via cvar (e.g. no spitter)
export default function isClassOverLimit(players: readonly PlayerState[], siClass: SIClass) {
  if ( siClass === SIClass.Witch || siClass === SIClass.Tank) {
    return false;
  }

  const classLimit = 1; // read this from cvar state

  // Count SI classes of all alive & ghost infected
  const classCounts = players
    .reduce<Record<SIClass, number>>((acc, next) => {
      if(next.siClass > SIClass.Common && next.siClass < SIClass.Witch) {
        ++acc[next.siClass]
      }
      return acc;
    }, [0,0,0,0,0,0,0,0,0,0]);

    if (classCounts[siClass] >= classLimit) {
      return true;
    }
    if (!isDominator(siClass)) {
      // Non-dominators are always allowed.
      return false;
    }
    const dominatorCount = SIDominators.map(c => classCounts[c]).reduce((acc, next) => acc + next, 0);
    // 3 or more dominators, don't allow additional dominators.
    // This is hard-coded in game logic... so we don't get cvar control.
    return dominatorCount > 2;
}