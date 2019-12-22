import { Util } from "../internal";

export default class Fraction {
    constructor(public n: number, public d: number = 1) { }
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
    decimal(): number { return this.n / this.d; }
    plus(other: Fraction): Fraction { return Fraction.dtf(this.decimal() + other.decimal()); }
    minus(other: Fraction): Fraction { return Fraction.dtf(this.decimal() - other.decimal()); }
    times(other: Fraction): Fraction { return Fraction.dtf(this.decimal() * other.decimal()); }
    divide(other: Fraction): Fraction { return Fraction.dtf(this.decimal() / other.decimal()); }
}
