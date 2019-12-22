import { FracInterval, Interval, Util, FreqRatio } from "../internal";

export default class ETInterval extends FracInterval {
    valueOf(): string {
        return `${this.n} [${this.d}ET]`;
    }
    normalized(): Interval {
        let a: number = this.n, b: number = this.d;
        a = Util.mod(a, b);
        return new ETInterval(a, b);
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
