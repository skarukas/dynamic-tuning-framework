import { FracInterval, Fraction, ETInterval, Interval } from "../internal";
/**
 * An representation of an interval as a frequency ratio.
 *
 * *immutable*
 */
export default class FreqRatio extends FracInterval {
    constructor(n: number, d?: number);
    /** The frequency ratio, e.g. "3:2", */
    get name(): string;
    /** or a custom name. */
    set name(val: string);
    /** Creates a `FreqRatio` from a `Fraction`. */
    static fromFraction(frac: Fraction): FreqRatio;
    /** Returns the largest prime number involved in the ratio. */
    largestPrimeFactor(): number;
    /** Return the frequency ratio as a decimal. */
    decimal(): number;
    valueOf(): string;
    mod(modulus: Interval): FreqRatio;
    multiply(factor: number): FreqRatio;
    asFrequency(): FreqRatio;
    asET(base?: number): ETInterval;
    inverse(): FreqRatio;
    add(other: FreqRatio): FreqRatio;
}
