import { Interval, Note } from "../internal";
export default class Frequency extends Note {
    freq: number;
    /** The frequency of the note, e.g. "500 Hz"  */
    get name(): string;
    /** or a custom name. */
    set name(val: string);
    noteAbove(interval: Interval): Note;
    transposeBy(interval: Interval): void;
    getETPitch(base?: number): number;
    getFrequency(): number;
    constructor(freq: number);
}
