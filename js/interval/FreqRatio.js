import { FracInterval, Util, ETInterval, Interval } from "../internal";
/**
 * An representation of an interval as a frequency ratio.
 *
 * *immutable*
 */
export default class FreqRatio extends FracInterval {
    // FreqRatio methods
    constructor(n, d = 1) {
        if (!(n > 0 && d > 0))
            throw new RangeError("Frequency ratios must be positive.");
        // simplify ratio
        if (n % 1 || d % 1) {
            [n, d] = Util.dtf(n / d);
        }
        super(n, d);
    }
    /** The frequency ratio, e.g. "3:2", */
    get name() {
        return this.__name__ || this.n + ":" + this.d;
    }
    /** or a custom name. */
    set name(val) { this.__name__ = val; }
    /** Creates a `FreqRatio` from a `Fraction`. */
    static fromFraction(frac) {
        return new FreqRatio(frac.n, frac.d);
    }
    /** Returns the largest prime number involved in the ratio. */
    largestPrimeFactor() {
        // turn it into a ratio of integers
        let norm = this.normalized();
        return Util.largestPrimeFactor(norm.n * norm.d);
    }
    /** Return the frequency ratio as a decimal. */
    decimal() {
        return this.frac.decimal();
    }
    valueOf() {
        return `${this.n}:${this.d}`;
    }
    mod(modulus) {
        let decimalBase = modulus.asFrequency().decimal(), remainder = Util.powerMod(this.decimal(), decimalBase);
        return new FreqRatio(remainder);
    }
    multiply(factor) {
        if (isNaN(factor))
            throw new RangeError("Factors must be numeric.");
        return new FreqRatio(Math.pow(this.n, factor), Math.pow(this.d, factor));
    }
    asFrequency() { return this; }
    asET(base = 12) {
        let num = base * Util.log2(this.decimal());
        return new ETInterval(num, base);
    }
    inverse() {
        return new FreqRatio(this.d, this.n);
    }
    add(other) {
        let ratio = other.asFrequency(), product = this.frac.times(ratio.frac);
        return FreqRatio.fromFraction(product);
    }
}
Interval.octave = new FreqRatio(2);
//# sourceMappingURL=FreqRatio.js.map