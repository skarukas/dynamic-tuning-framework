import { FracInterval, Interval, FreqRatio } from "../internal";
/**
 * An representation of an interval that stores the number of steps in a certain "ET" system.
 *
 * *immutable*
 */
export default class ETInterval extends FracInterval {
    readonly steps: number;
    readonly base: number;
    constructor(steps: number, base?: number);
    /** The size in steps (interval class) and base, e.g. "4 [12ET]", */
    get name(): string;
    /** or a custom name. */
    set name(val: string);
    /**
     * Creates a string representation of the interval class, e.g. "4 [12ET]""
     */
    toString(): string;
    mod(modulus: Interval): ETInterval;
    multiply(factor: number): Interval;
    asFrequency(): FreqRatio;
    asET(base?: number): ETInterval;
    inverse(): Interval;
    add(other: Interval): Interval;
}
