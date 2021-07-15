import './SeedOracle.css';
import { useSelector } from "react-redux";
import { allStandardSIOrdered } from "./models/SIClass";
import { GameState } from "./redux/gameStateSlice";
import { useMemo } from 'react';
import BadgedSI from './components/BadgedSI';

/**
 * Split an array into overlapping chunks of size 'count'.
 * There will be one chunk for each item in the array, starting at that item.
 * Chunks that begin near the end of the array will loop around 
 * and take items from the start of the array.
 * @param arr input array
 * @param count number of items per chunk
 * @returns an array of arrays of items
 */
function rotatingChunks<T>(arr: readonly T[], count: number): T[][] {
  return arr.map((_, idx) => ([
    ...arr.slice(idx, idx+count),
    ...arr.slice(0, Math.max(idx+count-arr.length, 0)),
  ]));
}
export default function SeedOracle() {
  const playerCount = useSelector((state: GameState) => state.orderedPlayers.length);
  const siChunks = useMemo(() => rotatingChunks(allStandardSIOrdered, playerCount), [playerCount]);
  return (
    <div className="seed-oracle-container">
    {
      siChunks.map((siChunk) => (
        <div key={siChunk[0]}>
          <div className='seed-segment'>
            <span>Seed:</span>
            <BadgedSI siClass={siChunk[0]} />
          </div>
          <div>Roster:
            <ol>
              {
                siChunk.map((siClass) => (
                  <li key={siClass}>
                    <BadgedSI siClass={siClass} />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      )) 
    }
    </div>
  )
}