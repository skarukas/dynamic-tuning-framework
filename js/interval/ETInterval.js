"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
/**
 * An representation of an interval that stores the number of steps in a certain "ET" system.
 *
 * *immutable*
 */
class ETInterval extends internal_1.FracInterval {
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
        return this.__name__ || `${this.n} [${this.d}ET]`;
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
        let other = modulus.asET(this.base), remainder = internal_1.Util.mod(this.n, other.n);
        return new ETInterval(remainder, this.d);
    }
    multiply(factor) {
        if (isNaN(factor))
            throw new RangeError("Factors must be numeric.");
        return new ETInterval(this.n * factor, this.d);
    }
    asFrequency() {
        let decimal = Math.pow(2, (this.steps / this.base));
        let [a, b] = internal_1.Util.dtf(decimal);
        return new internal_1.FreqRatio(a, b);
    }
    asET(base = 12) {
        if (base == this.base)
            return this;
        return new ETInterval(this.frac.decimal() * base, base);
    }
    inverse() {
        return new ETInterval(-this.n, this.d);
    }
    add(other) {
        let _other = other.asET(this.base);
        return new ETInterval(this.n + _other.n, this.base);
    }
}
exports.default = ETInterval;
//# sourceMappingURL=ETInterval.js.map