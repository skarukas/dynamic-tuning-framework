import { Note, Interval, Frequency, ETPitch } from "../internal";
/**
 * A `Note` with no pitch, used for interval structures without a definite transposition.
 */
export default class NullNote extends Note {
    /** Either an empty string or a custom name. */
    get name(): string;
    set name(val: string);
    /** Does nothing. */
    transposeBy(interval: Interval): void;
    /** Returns a new `NullNote`. */
    noteAbove(interval: Interval): Note;
    /** Returns `NaN`. */
    getETPitch(base?: number): number;
    /** Returns `NaN`. */
    getFrequency(): number;
    /** Returns `null`. */
    intervalTo(other: Note): Interval;
    /** Returns `null`. */
    asFrequency(): Frequency;
    /** Returns `null`. */
    asET(): ETPitch;
    /** Returns `NaN`. */
    errorInET(base: number, from: Note): number;
    /** Returns `NaN`. */
    cents(): number;
}
