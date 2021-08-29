enum SIClass {
  Common=0,
  Smoker,
  Boomer,
  Hunter,
  Spitter,
  Jockey,
  Charger,
  Witch,
  Tank,
};

export type StandardSIClass = SIClass.Smoker | SIClass.Boomer | SIClass.Hunter | SIClass.Spitter | SIClass.Jockey | SIClass.Charger;

export function getSIName(siClass: SIClass): string {
  return SIClass[siClass];
}

export function prettySIName(siClass: SIClass): string {
  return `${getSIName(siClass)} (${siClass})`;
}

export function isDominator(siClass: SIClass): boolean {
  switch(siClass) {
    case SIClass.Smoker:
    case SIClass.Hunter:
    case SIClass.Jockey:
    case SIClass.Charger:
        return true;
    default:
      return false;
  }
}

export const SIDominators = [SIClass.Smoker, SIClass.Hunter, SIClass.Jockey, SIClass.Charger] as const;
export const allStandardSIOrdered = [
  SIClass.Smoker,
  SIClass.Boomer,
  SIClass.Hunter,
  SIClass.Spitter,
  SIClass.Jockey,
  SIClass.Charger,
] as const;

/**
 * Returns a list of all SI that starts at the given SI and wraps around the standard list in order.
 * @param siClass The SI class you want the list to start on
 */
export function rotateSIListTo(siClass: SIClass) {
  return [
    ...allStandardSIOrdered.slice(siClass-1),
    ...allStandardSIOrdered.slice(0, siClass-1),
  ];
}
export default SIClass;