import './GameControl.css';

import { useDispatch, useSelector } from 'react-redux';
import { GameState, gameStateActions } from '../redux/gameStateSlice';
import PlayerControl from './PlayerControl';
import BadgedSI from './BadgedSI';
import getPlayers from '../redux/getPlayers';

export default function GameControl() {
  const seed = useSelector((state: GameState) => state.spawnSeed);
  const players = useSelector(getPlayers);
  const dispatch = useDispatch();
  return (
    <div>
      <div className='seed-display-text'>Current spawn seed is: <BadgedSI siClass={seed} />.</div>
      <div>
        <button onClick={ () => dispatch(gameStateActions.newMap()) }>New Game (new seed)</button>
        <button onClick={ () => dispatch(gameStateActions.newRound()) }>New Round (same seed)</button>
      </div>
      <div className="player-controls">
        {
          players.map((p) => (
            <PlayerControl key={p.id} player={p} />
          ))
        }
      </div>
    </div>
  );
}

