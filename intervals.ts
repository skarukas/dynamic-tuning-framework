import { Util } from "./util";

// Intervals are generally meant to be immutable
export abstract class Interval {
    // static comparison functions
    static compareSize(_a: Interval, _b: Interval): number {
        let a = _a.asET(), 
            b = _b.asET();
        return a.n - b.n;
    }
    static compareComplexity(_a: Interval, _b: Interval): number {
        let a = _a.asRatio(), 
            b = _b.asRatio(),
            x = a.largestPrimeFactor(),
            y = b.largestPrimeFactor();
        return (x != y)? x - y : (a.n + a.d) - (b.n + b.d);
    }
    abstract inverse(): Interval;
    abstract add(other: Interval): Interval;
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }
    abstract multiply(factor: number): Interval;
    divide(n: number): Interval {
        return this.multiply(1/n)
    }
    abstract asRatio(): FreqRatio;
    abstract asET(base?: number): ETInterval;
    cents(): number { // size of tne interval in cents, to 2 decimal places
        return Util.round(this.asET().steps * 100, 2);
    }
    equals(other: Interval): boolean {
        return this.cents() - other.cents() < 1E-2;
    }
    abstract normalized(): Interval; // compressed to an octave
    errorFromET(base: number = 12): number {
        let et = this.getNearestET(base);
        return this.subtract(et).cents();
    }
    getNearestET(base: number = 12): ETInterval { // returns closest integer ET in base
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
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
    constructor(n: number, d: number = 1) {
        super();
        this.frac = new Fraction(n, d);
    }
    get n() { return this.frac.n }
    get d() { return this.frac.d }
    set n(val) { this.frac.n = val }
    set d(val) { this.frac.d = val }
}

export class FreqRatio extends FracInterval {
    // FreqRatio methods
    constructor(n: number, d: number = 1) {
        // simplify ratio
        if (n % 1 || d % 1) {
            [n, d] = Util.dtf(n/d);
        }
        super(n, d);
    }
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
    valueOf(): string {
        return `${this.n}:${this.d}`;
    }

    // Interval methods
    normalized(): FreqRatio {
        return this.asET().normalized().asRatio();
    }
    multiply(factor: number): FreqRatio {
        return new FreqRatio(this.n**factor, this.d);
    }
    asRatio(): FreqRatio { return this }
    asET(base: number = 12): ETInterval {
        let num: number = base * Util.log2(this.decimal());
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
    valueOf(): string {
        return `${this.n} [${this.d}ET]`;
    }
    normalized(): Interval {
        let a: number = this.n,
            b: number = this.d;
        a = Util.mod(a, b);
        return new ETInterval(a, b);
    }
    multiply(factor: number): Interval {
        return new ETInterval(this.n*factor, this.d);
    }
    constructor(public readonly steps: number, public readonly base: number = 12) {
        super(steps, base);
    }
    asRatio(): FreqRatio {
        let decimal: number = 2**(this.steps/this.base);
        let [a, b] = Util.dtf(decimal);
        return new FreqRatio(a, b);
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

export const JI = {
    third: new FreqRatio(5/4),
    fifth: new FreqRatio(3/2),
    seventh: new FreqRatio(7/4)
}