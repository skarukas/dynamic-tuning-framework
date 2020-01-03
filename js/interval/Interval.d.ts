import { PitchedObj, FreqRatio, ETInterval } from "../internal";
export default abstract class Interval extends PitchedObj {
    static octave: FreqRatio;
    static compareSize(_a: Interval, _b: Interval): number;
    static compareComplexity(_a: Interval, _b: Interval): number;
    abstract mod(modulus: Interval): Interval;
    /**
     * Compress the interval to an octave.
     */
    normalized(): Interval;
    abstract inverse(): Interval;
    abstract add(other: Interval): Interval;
    subtract(other: Interval): Interval;
    abstract multiply(factor: number): Interval;
    divide(n: number): Interval;
    abstract asFrequency(): FreqRatio;
    abstract asET(base?: number): ETInterval;
    cents(): number;
    errorInET(base?: number): number;
    getNearestET(base?: number): ETInterval;
}
