import { PitchedObj, FreqRatio, ETInterval, Util } from "../internal";

/**
 * An interval with a size and mathematical operations that work in the pitch/log-frequency domain.
 * 
 * Designed to be immutable.
 */
export default abstract class Interval extends PitchedObj {

    static octave: FreqRatio;

    // ====== static comparison functions for sorting ======

    /**
     * Compare two intervals by size, producing a number. 
     * A positive result means `a` is larger, and vice versa.
     * 
     * Used for sorting.
     */
    static compareSize(_a: Interval, _b: Interval): number {
        let a = _a.asET(), b = _b.asET();
        return a.n - b.n;
    }

    /**
     * Compare two intervals by complexity of their frequency ratios, producing a number. 
     * A positive result means `a` is more complex, and vice versa.
     * 
     * Used for sorting.
     */
    static compareComplexity(_a: Interval, _b: Interval): number {
        let a = _a.asFrequency(), 
            b = _b.asFrequency(), 
            x = a.largestPrimeFactor(), 
            y = b.largestPrimeFactor();
        return (x != y) ? x - y : (a.n + a.d) - (b.n + b.d);
    }

    /**
     * Returns the remainder when the `Interval` is divided by `modulus`.
     * 
     * @param modulus The interval to divide by
     * @returns The remainder interval
     */
    abstract mod(modulus: Interval): Interval;

    /** Compress it to be an ascending interval less than an octave. */
    normalized(): Interval {
        return this.mod(Interval.octave);
    }

    /** Flip the direction of the interval. */
    inverse(): Interval {
        return this.multiply(-1);
    }

    /** Add the two intervals together in pitch space. */
    abstract add(other: Interval): Interval;

    /** Subtract the other interval from this interval. */
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }

    /** Scale the interval by a certain number. */
    abstract multiply(factor: number): Interval;

    /** Divide the interval by a certain number. */
    divide(n: number): Interval {
        return this.multiply(1 / n);
    }

    /** Divide the interval by another Interval. */
    divideByInterval(other: Interval): number {
        return this.cents() / other.cents();
    }

    abstract asFrequency(): FreqRatio;
    abstract asET(base?: number): ETInterval;

    cents(): number {
        return Util.round(this.asET().steps * 100, 2);
    }

    /** Returns the `ETInterval` closest in size. */
    getNearestET(base: number = 12): ETInterval {
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }

    errorInET(base: number = 12): number {
        let et = this.getNearestET(base);
        return this.subtract(et).cents();
    }
}
