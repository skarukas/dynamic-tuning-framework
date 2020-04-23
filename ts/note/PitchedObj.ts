import { Note, FreqRatio, Frequency, ETInterval, ETPitch } from "../internal";


export default abstract class PitchedObj {
    /** Returns the number of cents from the equal-tempered `PitchedObj closest in size. */
    abstract errorInET(base?: number, from?: Note): number;

    /** Returns the object's representation in the frequency domain. */
    abstract asFrequency(): FreqRatio | Frequency;

    /** Returns the object's representation in the pitch domain. */
    abstract asET(etBase?: number): ETInterval | ETPitch;

    /** Returns the object's size in cents, rounded to 2 decimal places. */
    abstract cents(): number;

    /** Checks if two `PitchedObj`'s are the same size. */
    equals(other: PitchedObj): boolean {
        return this.cents() == other.cents();
    }

    // for non-unique identification independent from actual pitch/freq, such as letter note name
    abstract get name(): string;
    abstract set name(val);
    protected __name__ = "";
    toString(): string {
        return this.name;
    }
}