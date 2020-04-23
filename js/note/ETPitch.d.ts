import { Note, Interval, ETInterval } from "../internal";
export default class ETPitch extends Note {
    pitch: number;
    base: number;
    /** The chromatic note name, e.g. "C#"  */
    get name(): string;
    /** or a custom name. */
    set name(val: string);
    constructor(pitch: number, base?: number);
    noteAbove(interval: Interval): Note;
    transposeBy(interval: Interval): void;
    getETPitch(base?: number): number;
    getFrequency(): number;
    intervalTo(other: Note): ETInterval;
}
