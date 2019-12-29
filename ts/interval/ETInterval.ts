import { FracInterval, Interval, Util, FreqRatio } from "../internal";

export default class ETInterval extends FracInterval {
    valueOf(): string {
        return `${this.n} [${this.d}ET]`;
    }
    mod(modulus: Interval): ETInterval {
        let other: ETInterval = modulus.asET(this.base),
            remainder = Util.mod(this.n, other.n);
        return new ETInterval(remainder, this.d);
    }
    multiply(factor: number): Interval {
        return new ETInterval(this.n * factor, this.d);
    }
    constructor(public readonly steps: number, public readonly base: number = 12) {
        super(steps, base);
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
        return new ETInterval(-this.n, this.d);
    }
    add(other: Interval): Interval {
        let _other: ETInterval = other.asET(this.base);
        return new ETInterval(this.n + _other.n, this.base);
    }
}
