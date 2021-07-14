import SIClass from "../models/SIClass";

export const PlayerNames: ReadonlyArray<string> = [
  'purple',
  'mason',
  'killatoy',
  'breaker',
  'ProdigySim',
  'CanadaRox',
  'grizz',
  'RailsBarlow',
  'LuckyLock',
  'qeo',
  'Chd',
  'kimchi',
  'flyby',
  'dectheone',
  'IcyInferno',
  'n1njaaa',
  'jcb',
  'alexi21',
  'SirPlease',
  'vex',
  'vanille',
  'BRBOWLFEXIN`',
];
export interface PlayerState {
  id: number;
  name: string;
  classTimestamps: Record<SIClass, number>;
  siClass: SIClass;
  spawnState: 'dead' | 'alive' | 'ghost';
}


let playerId = 1;
export const vendNewPlayer = (name: string): PlayerState => ({
    id: playerId++,
    name,
    classTimestamps: [0,0,0,0,0,0,0,0,0],
    siClass: SIClass.Common, // Default to non-special until in ghost state (spawned).
    spawnState: 'dead',
});
