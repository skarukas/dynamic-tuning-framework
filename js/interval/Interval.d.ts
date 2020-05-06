import { PitchedObj, FreqRatio, ETInterval } from "../internal";
/**
 * An interval with a size and mathematical operations that work in the pitch/log-frequency domain.
 *
 * Designed to be immutable.
 */
export default abstract class Interval extends PitchedObj {
    static octave: FreqRatio;
    /**
     * Compare two intervals by size, producing a number.
     * A positive result means `a` is larger, and vice versa.
     *
     * Used for sorting.
     */
    static compareSize(_a: Interval, _b: Interval): number;
    /**
     * Compare two intervals by complexity of their frequency ratios, producing a number.
     * A positive result means `a` is more complex, and vice versa.
     *
     * Used for sorting.
     */
    static compareComplexity(_a: Interval, _b: Interval): number;
    /**
     * Returns the remainder when the `Interval` is divided by `modulus`.
     *
     * @param modulus The interval to divide by
     * @returns The remainder interval
     */
    abstract mod(modulus: Interval): Interval;
    /** Compress it to be an ascending interval less than an octave. */
    normalized(): Interval;
    /** Flip the direction of the interval. */
    inverse(): Interval;
    /** Add the two intervals together in pitch space. */
    abstract add(other: Interval): Interval;
    /** Subtract the other interval from this interval. */
    subtract(other: Interval): Interval;
    /** Scale the interval by a certain number. */
    abstract multiply(factor: number): Interval;
    /** Divide the interval by a certain number. */
    divide(n: number): Interval;
    /** Divide the interval by another Interval. */
    divideByInterval(other: Interval): number;
    abstract asFrequency(): FreqRatio;
    abstract asET(base?: number): ETInterval;
    cents(): number;
    /** Returns the `ETInterval` closest in size. */
    getNearestET(base?: number): ETInterval;
    errorInET(base?: number): number;
}
