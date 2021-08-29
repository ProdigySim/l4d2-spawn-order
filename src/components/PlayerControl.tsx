import './PlayerControl.css';

import { useDispatch, useSelector } from "react-redux";
import cx from 'classnames';
import { getSIName, prettySIName } from "../models/SIClass";
import { gameStateActions } from "../redux/gameStateSlice";
import getNextSpawns from "../redux/getNextSpawns";
import { PlayerState } from "../redux/playerState";
import getPlayerSpawnLists, { SpawnCandidateClassInfo } from '../redux/getPlayerSpawnLists';
import { SIImage } from './BadgedSI';

function PlayerSpawnIcon({ siClass, timestamp, isAliveAs, isDeadAs, isOverLimit, isNextSpawnCandidate }: SpawnCandidateClassInfo) {
  const statusText = (() => {
    if(isAliveAs) {
      return '😊';
    } else if (isDeadAs) {
      return '😇';
    } else if (isOverLimit) {
      return '✖';
    } else if (isNextSpawnCandidate) {
      return '⬆';
    } else {
      return '';
    }
  })();
  return (<div 
    className={cx({
      'class-disabled': isOverLimit,
      'has-played': timestamp > 0,
      'is-alive-as': isAliveAs,
      'player-spawn-icon': true,
    })}
  
    title={`${getSIName(siClass)} last played ${
      timestamp > 0 ? `@ tick ${timestamp}` : 'never'
    }${isOverLimit ? '\nUnavailable due to class/dominator limits' : ''}`}
  >
    <SIImage siClass={siClass} />
    <div className='status-icon'>{statusText}</div>
  </div>);
}

export default function PlayerControl({ player }: { player: PlayerState}) {
  const nextSpawn = useSelector(getNextSpawns)[player.id];
  const spawnList = useSelector(getPlayerSpawnLists)[player.id];
  const dispatch = useDispatch();

  const stateToggle = player.spawnState === 'dead'
    ? () => dispatch(gameStateActions.spawnPlayer(player.id))
    : () => dispatch(gameStateActions.killPlayer(player.id));
  return <div className='player-control'>
    <div>
      { 
        player.spawnState === 'dead'
        ? (<span>{ player.name } is Dead. Their last spawn was: {prettySIName(player.siClass)}</span>)
        : (<span>{ player.name } is spawned as a {prettySIName(player.siClass)}.</span>)
      }
      <div>
        <button 
          className='playerSpawnStateToggle' 
          onClick={stateToggle}
        >{player.spawnState === 'dead' ? 'Spawn' : 'Kill'}</button>
      </div>
    </div>
    <div>
      <span>Spawn Queue:</span>
      <div className='player-spawn-icons'>
        { spawnList.map(PlayerSpawnIcon) }
      </div>
    </div>
  </div>
}