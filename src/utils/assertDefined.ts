export default function assertDefined(value: unknown, explanation: string): asserts value {
  console.assert(value !== undefined, explanation);
}