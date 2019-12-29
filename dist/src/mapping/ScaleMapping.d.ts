import { Mapping, PitchedObj, Interval } from "../internal";
export default class ScaleMapping extends Mapping {
    constructor(notesPerOctave?: number);
    map: Interval[];
    protected getIntervalByIndex(key: number): Interval;
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     *
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index: number, value: PitchedObj): void;
    toString(): string;
}
