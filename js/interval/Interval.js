import { PitchedObj, Util } from "../internal";
/**
 * An interval with a size and mathematical operations that work in the pitch/log-frequency domain.
 *
 * Designed to be immutable.
 */
export default class Interval extends PitchedObj {
    // ====== static comparison functions for sorting ======
    /**
     * Compare two intervals by size, producing a number.
     * A positive result means `a` is larger, and vice versa.
     *
     * Used for sorting.
     */
    static compareSize(_a, _b) {
        let a = _a.asET(), b = _b.asET();
        return a.n - b.n;
    }
    /**
     * Compare two intervals by complexity of their frequency ratios, producing a number.
     * A positive result means `a` is more complex, and vice versa.
     *
     * Used for sorting.
     */
    static compareComplexity(_a, _b) {
        let a = _a.asFrequency(), b = _b.asFrequency(), x = a.largestPrimeFactor(), y = b.largestPrimeFactor();
        return (x != y) ? x - y : (a.n + a.d) - (b.n + b.d);
    }
    /** Compress it to be an ascending interval less than an octave. */
    normalized() {
        return this.mod(Interval.octave);
    }
    /** Flip the direction of the interval. */
    inverse() {
        return this.multiply(-1);
    }
    /** Subtract the other interval from this interval. */
    subtract(other) {
        return this.add(other.inverse());
    }
    /** Divide the interval by a certain number. */
    divide(n) {
        return this.multiply(1 / n);
    }
    cents() {
        return Util.round(this.asET().steps * 100, 2);
    }
    /** Returns the `ETInterval` closest in size. */
    getNearestET(base = 12) {
        let et = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
    errorInET(base = 12) {
        let et = this.getNearestET(base);
        return this.subtract(et).cents();
    }
}
//# sourceMappingURL=Interval.js.map