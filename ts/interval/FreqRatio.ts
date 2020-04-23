import { FracInterval, Util, Fraction, ETInterval, Interval } from "../internal";

/**
 * An representation of an interval as a frequency ratio.
 * 
 * *immutable*
 */
export default class FreqRatio extends FracInterval {
    
    // FreqRatio methods
    constructor(n: number, d: number = 1) {
        if (! (n > 0 && d > 0)) throw new RangeError("Frequency ratios must be positive.");
        // simplify ratio
        if (n % 1 || d % 1) {
            [n, d] = Util.dtf(n / d);
        }
        super(n, d);
    }


    /** The frequency ratio, e.g. "3:2", */
    get name(): string {
        return this.__name__ || this.n + ":" + this.d;
    }
    
    /** or a custom name. */
    set name(val) { this.__name__ = val }

    /** Creates a `FreqRatio` from a `Fraction`. */
    static fromFraction(frac: Fraction): FreqRatio {
        return new FreqRatio(frac.n, frac.d);
    }

    /** Returns the largest prime number involved in the ratio. */
    largestPrimeFactor(): number {
        // turn it into a ratio of integers
        let norm = this.normalized() as FreqRatio;
        return Util.largestPrimeFactor(norm.n * norm.d);
    }

    /** Return the frequency ratio as a decimal. */
    decimal(): number {
        return this.frac.decimal();
    }

    valueOf(): string {
        return `${this.n}:${this.d}`;
    }

    mod(modulus: Interval): FreqRatio {
        let decimalBase: number = modulus.asFrequency().decimal(),
            remainder: number = Util.powerMod(this.decimal(), decimalBase);
        return new FreqRatio(remainder);
    }

    multiply(factor: number): FreqRatio {
        if (isNaN(factor)) throw new RangeError("Factors must be numeric.");
        return new FreqRatio(this.n ** factor, this.d ** factor);
    }

    asFrequency(): FreqRatio { return this; }

    asET(base: number = 12): ETInterval {
        let num: number = base * Util.log2(this.decimal());
        return new ETInterval(num, base);
    }

    inverse(): FreqRatio {
        return new FreqRatio(this.d, this.n);
    }

    add(other: FreqRatio): FreqRatio {
        let ratio = other.asFrequency(), 
            product: Fraction = this.frac.times(ratio.frac);
        return FreqRatio.fromFraction(product);
    }
}

Interval.octave = new FreqRatio(2);