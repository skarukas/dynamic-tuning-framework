import { FracInterval, Util, FreqRatio } from "../internal";
/**
 * An representation of an interval that stores the number of steps in a certain "ET" system.
 *
 * *immutable*
 */
export default class ETInterval extends FracInterval {
    constructor(steps, base = 12) {
        super(steps, base);
        this.steps = steps;
        this.base = base;
        if (isNaN(steps / base))
            throw new RangeError("ET pitch indices must be numeric.");
        if (base == 0)
            throw new RangeError("Cannot create an equal division of base zero.");
    }
    /** The size in steps (interval class) and base, e.g. "4 [12ET]", */
    get name() {
        return this.__name__ || `${this.n.toFixed(2)} [${this.d}ET]`;
    }
    /** or a custom name. */
    set name(val) { this.__name__ = val; }
    /**
     * Creates a string representation of the interval class, e.g. "4 [12ET]""
     */
    toString() {
        return this.name;
    }
    mod(modulus) {
        let other = modulus.asET(this.base), remainder = Util.mod(this.n, other.n);
        return new this.constructor(remainder, this.d);
    }
    multiply(factor) {
        if (isNaN(factor))
            throw new RangeError("Factors must be numeric.");
        return new this.constructor(this.n * factor, this.d);
    }
    asFrequency() {
        let decimal = Math.pow(2, (this.steps / this.base));
        let [a, b] = Util.dtf(decimal);
        return new FreqRatio(a, b);
    }
    asET(base = 12) {
        if (base == this.base)
            return this;
        return new ETInterval(this.frac.decimal() * base, base);
    }
    inverse() {
        return new this.constructor(-this.n, this.d);
    }
    add(other) {
        let _other = other.asET(this.base);
        return new this.constructor(this.n + _other.n, this.base);
    }
}
//# sourceMappingURL=ETInterval.js.map