import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GameState, gameStateActions } from './redux/gameStateSlice';
import getPlayers from './redux/getPlayers';
import { getSIName } from './models/SIClass';
import PlayerControl from './PlayerControl';

function App() {
  const seed = useSelector((state: GameState) => state.spawnSeed);
  const players = useSelector(getPlayers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameStateActions.populateGame(4));
  }, [dispatch])
  return (
    <div className="App">
      <div>
        <h1>Spawn Simulator</h1>
      </div>
      <div>
        <p>Current spawn seed is: {getSIName(seed)} ({seed}).</p>
        <button>New Game (new seed)</button>
        <button>New Round (same seed)</button>
        {
          players.map((p) => (
            <PlayerControl key={p.id} player={p} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
