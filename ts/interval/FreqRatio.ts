import { FracInterval, Util, Fraction, ETInterval, Interval } from "../internal";

export default class FreqRatio extends FracInterval {
    // FreqRatio methods
    constructor(n: number, d: number = 1) {
        // simplify ratio
        if (n % 1 || d % 1) {
            [n, d] = Util.dtf(n / d);
        }
        super(n, d);
    }
    static fromFraction(frac: Fraction): FreqRatio {
        return new FreqRatio(frac.n, frac.d);
    }
    largestPrimeFactor(): number {
        let norm = this.normalized() as FreqRatio;
        return Util.largestPrimeFactor(norm.n * norm.d);
    }
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