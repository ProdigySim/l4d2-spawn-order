import './BadgedSI.css';

import smokerImg from '../images/zombieteamimage_smoker.png';
import boomerImg from '../images/zombieteamimage_boomer.png';
import hunterImg from '../images/zombieteamimage_hunter.png';
import spitterImg from '../images/zombieteamimage_spitter.png';
import jockeyImg from '../images/zombieteamimage_jockey.png';
import chargerImg from '../images/zombieteamimage_charger.png';

import SIClass, { getSIName } from '../models/SIClass';

const SIImages = {
  [SIClass.Smoker]: smokerImg,
  [SIClass.Boomer]: boomerImg,
  [SIClass.Hunter]: hunterImg,
  [SIClass.Spitter]: spitterImg,
  [SIClass.Jockey]: jockeyImg,
  [SIClass.Charger]: chargerImg,
} as const;

export default function BadgedSI({ siClass }: { siClass: keyof typeof SIImages }) {
  return (
    <span className='badged-si-name'>
      <img className='si-badge-image' alt={`${getSIName(siClass)} icon`} src={SIImages[siClass]} />
      <span>{getSIName(siClass)}</span>
      <span>({siClass})</span>
    </span>
  )
}