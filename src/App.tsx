import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { gameStateActions } from './redux/gameStateSlice';
import SeedOracle from './SeedOracle';
import GameControl from './components/GameControl';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameStateActions.populateGame(4));
  }, [dispatch])
  return (
    <div className="App">
      <div>
        <h1>L4D2 Spawn Order Algorithm</h1>
        <p>Each player's next SI Class is determined by the initial SI Class roster ("Spawn Seed"), and the list of SI classes they previously spawned as.
          <br/>When a player's respawn timer hits 0 and they enter the ghost state, the game selects their next SI. The player will become SI class they have spawned as the least recently which does not violate any SI class limits or dominator limits. 
          <br/>In case of a tie, the SI Class will be chosen based on order in the SI class list, starting from the Spawn Seed and counting upwards. 
          <br/>A notable wrinkle here is that the class limits are checked against ghost/dead/alive players, whereas the dominator limit check only looks at ghost/alive players.</p>
      </div>
      <div>
        <h1>Spawn Simulator</h1>
        <GameControl />
      </div>
      <div>
        <h1>Spawn Seed Oracle</h1>
        <SeedOracle/>
      </div>
    </div>
  );
}

export default App;
