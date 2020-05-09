import { FracInterval, Interval, Util, FreqRatio } from "../internal";
type Constructor = { new(...args: any): any }
/**
 * An representation of an interval that stores the number of steps in a certain "ET" system.
 * 
 * *immutable*
 */
export default class ETInterval extends FracInterval {
    
    constructor(public readonly steps: number, public readonly base: number = 12) {
        super(steps, base);
        if (isNaN(steps/base)) throw new RangeError("ET pitch indices must be numeric.");
        if (base <= 0) throw new RangeError("Cannot create an equal division with base <= 0.");
    }

    /** The size in steps (interval class) and base, e.g. "4 [12ET]", */
    get name(): string {
        return this.__name__ || `${this.n.toFixed(2)} [${this.d}ET]`;
    }
    
    /** or a custom name. */
    set name(val) { this.__name__ = val }

    /**
     * Creates a string representation of the interval class, e.g. "4 [12ET]""
     */
    toString(): string {
        return this.name;
    }

    mod(modulus: Interval): ETInterval {
        let other: ETInterval = modulus.asET(this.base),
            remainder = Util.mod(this.n, other.n);
        return new (this.constructor as Constructor)(remainder, this.d);
    }

    multiply(factor: number): Interval {
        if (isNaN(factor)) throw new RangeError("Factors must be numeric.");
        return new (this.constructor as Constructor)(this.n * factor, this.d);
    }

    asFrequency(): FreqRatio {
        let decimal: number = 2 ** (this.steps / this.base);
        let [a, b] = Util.dtf(decimal);
        return new FreqRatio(a, b);
    }

    asET(base: number = 12): ETInterval {
        if (base == this.base)
            return this;
        return new ETInterval(this.frac.decimal() * base, base);
    }

    inverse(): Interval {
        return new (this.constructor as Constructor)(-this.n, this.d);
    }

    add(other: Interval): Interval {
        let _other: ETInterval = other.asET(this.base);
        return new (this.constructor as Constructor)(this.n + _other.n, this.base);
    }
}
