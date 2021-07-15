import { useDispatch, useSelector } from "react-redux";
import { prettySIName } from "./models/SIClass";
import { gameStateActions } from "./redux/gameStateSlice";
import getNextSpawns from "./redux/getNextSpawns";
import { PlayerState } from "./redux/playerState";



export default function PlayerControl({ player }: { player: PlayerState}) {
  const nextSpawn = useSelector(getNextSpawns)[player.id];
  const dispatch = useDispatch();

  const stateToggle = player.spawnState === 'dead'
    ? () => dispatch(gameStateActions.spawnPlayer(player.id))
    : () => dispatch(gameStateActions.killPlayer(player.id));
  return <div>
    { 
      player.spawnState === 'dead'
      ? (<span>{ player.name } is Dead. Their next spawn will be: {prettySIName(nextSpawn)}</span>)
      : (<span>{ player.name } is spawned as a {prettySIName(player.siClass)}.</span>)
    }
    { ' ' }
    <button 
      className='playerSpawnStateToggle' 
      onClick={stateToggle}
    >{player.spawnState === 'dead' ? 'Spawn' : 'Kill'}</button>
  </div>
}