import { Util } from "./util";

// Intervals are generally meant to be immutable
export abstract class Interval {
    abstract inverse(): Interval;
    abstract add(other: Interval): Interval;
    abstract stretch(factor: number): Interval;
    abstract asRatio(): FreqRatio;
    abstract asET(base?: number): ETInterval;
    abstract normalized(): Interval; // compressed to an octave

    getNearestET(base: number = 12): ETInterval { // returns closest integer ET in base
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }
}

// namespace for static comparison functions
export const IntervalSort = {
    bySize(_a: Interval, _b: Interval): number {
        let a = _a.asET(), 
            b = _b.asET();
        return a.n - b.n;
    },
    byComplexity(_a: Interval, _b: Interval): number {
        let a = _a.asRatio(), 
            b = _b.asRatio(),
            x = a.largestPrimeFactor(),
            y = b.largestPrimeFactor();
        return (x != y)? x - y : (a.n + a.d) - (b.n + b.d);
    }
}

class Fraction {
    constructor(public n: number, public d: number = 1) {}
    toString(): string {
        return `${this.n}/${this.d}`;
    }
    static dtf(n: number, err: number = 1E-9) {
        let [a, b] = Util.dtf(n, err);
        return new Fraction(a, b);
    }
    simplified(): Fraction {
        return null;
    }
    decimal(): number { return this.n / this.d  }
    plus(other: Fraction): Fraction   { return Fraction.dtf(this.decimal() + other.decimal()) }
    minus(other: Fraction): Fraction  { return Fraction.dtf(this.decimal() - other.decimal()) }
    times(other: Fraction): Fraction  { return Fraction.dtf(this.decimal() * other.decimal()) }
    divide(other: Fraction): Fraction { return Fraction.dtf(this.decimal() / other.decimal()) }
}

abstract class FracInterval extends Interval {
    protected frac: Fraction;
    constructor(public n: number, public d: number = 1) {
        super();
        this.frac = new Fraction(n, d);
    }
}

export class FreqRatio extends FracInterval {
    // FreqRatio methods
    static fromFraction(frac: Fraction): FreqRatio {
        return new FreqRatio(frac.n, frac.d);
    }
    largestPrimeFactor(): number {
        let norm = this.normalized();
        return Util.largestPrimeFactor(norm.n * norm.d);
    }
    decimal(): number {
        return this.frac.decimal();
    }

    // Interval methods
    normalized(): FreqRatio {
        return this.asET().normalized().asRatio();
    }
    stretch(factor: number): FreqRatio {
        return new FreqRatio(this.n**factor, this.d);
    }
    asRatio(): FreqRatio { return this }
    asET(base: number = 12): ETInterval {
        let num: number = Util.freqToET(this.decimal(), base);
        return new ETInterval(num, base);
    }
    inverse(): FreqRatio {
        return new FreqRatio(this.d, this.n);
    }
    add(other: Interval): FreqRatio {
        let ratio = other.asRatio(),
            product: Fraction = this.frac.times(ratio.frac);
        return FreqRatio.fromFraction(product);
    }
}

export class ETInterval extends FracInterval {
    normalized(): Interval {
        let a: number = this.n,
            b: number = this.d;
        a = Util.mod(a, b);
        return new ETInterval(a, b);
    }
    stretch(factor: number): Interval {
        return new ETInterval(this.n*factor, this.d);
    }
    constructor(public readonly steps: number, public readonly base: number = 12) {
        super(steps, base);
    }
    asRatio(): FreqRatio {
        let freq: number = Util.ETToFreq(this.n, this.base);
        let frac: Fraction = Fraction.dtf(freq);
        return FreqRatio.fromFraction(frac);
    }
    asET(base: number = 12): ETInterval {
        if (base == this.base) return this;
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