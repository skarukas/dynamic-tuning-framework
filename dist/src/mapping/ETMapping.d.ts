import { Mapping, Interval } from "../internal";
export default class ETMapping extends Mapping {
    private base;
    protected getIntervalByIndex(key: number): Interval;
    constructor(base: number, notesPerOctave?: number);
}
