import { Connectable, PitchedObj, Interval, Frequency, ETPitch, Component } from "../internal";
export default abstract class Note extends PitchedObj implements Connectable {
    static middleC: ETPitch;
    isStructural: boolean;
    /**
     * Returns a function that checks whether a `Note` is within a frequency range, inclusive.
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inFreqRange(lo: number, hi: number): (note: Note) => boolean;
    /**
     * Returns a function that checks whether a `Note` is within a 12ET pitch range, inclusive.
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inPitchRange(lo: number, hi: number): (note: Note) => boolean;
    getAllNotes(): Note[];
    /** Mutates the `Note` by transposing it up by a certain `Interval`. */
    abstract transposeBy(interval: Interval): void;
    /**
     * Create an equal division of an `Interval` into `div` parts, place them above the note,
     * and collect the resulting `Notes` in an array.
     *
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesAbove(interval: Interval, div: number): Note[];
    /**
     * Create an equal division of an `Interval` into `div` parts, place them below the note,
     * and collect the resulting `Notes` in an array.
     *
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesBelow(interval: Interval, div: number): Note[];
    /** Return the `Note` that is a given `Interval` above. */
    abstract noteAbove(interval: Interval): Note;
    /** Return the `Note` that is a given `Interval` below. */
    noteBelow(interval: Interval): Note;
    /** Return the pitch class number in a certain, `base` ET. */
    abstract getETPitch(base?: number): number;
    /** Return the frequency in Hertz, as a number. */
    abstract getFrequency(): number;
    /** Return the `FreqRatio` between this `Note` and another. */
    intervalTo(other: Note): Interval;
    getRoot(): this;
    asFrequency(): Frequency;
    asET(base?: number): ETPitch;
    errorInET(base?: number, from?: Note): number;
    cents(): number;
    connect(other: Connectable, by: Interval): Component;
}
