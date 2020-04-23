import { Note, Interval, Frequency, ETPitch } from "../internal";

/**
 * A `Note` with no pitch, used for interval structures without a definite transposition.
 */
export default class NullNote extends Note {
    
    /** Either an empty string or a custom name. */
    get name(): string {
        return this.__name__;
    }

    set name(val) { this.__name__ = val }

    /** Does nothing. */
    transposeBy(interval: Interval): void {}

    /** Returns a new `NullNote`. */
    noteAbove(interval: Interval): Note { 
        return new NullNote();
    }

    /** Returns `NaN`. */
    getETPitch(base?: number): number {
        return NaN;
    }

    /** Returns `NaN`. */
    getFrequency(): number {
        return NaN;
    }

    /** Returns `null`. */
    intervalTo(other: Note): Interval {
        return null;
    }

    /** Returns `null`. */
    asFrequency(): Frequency {
        return null;
    }

    /** Returns `null`. */
    asET(): ETPitch {
        return null;
    }

    /** Returns `NaN`. */
    errorInET(base: number = 12, from: Note): number {
        return NaN;
    }

    /** Returns `NaN`. */
    cents(): number {
        return NaN;
    }
}
