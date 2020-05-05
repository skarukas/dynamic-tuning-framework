import { Util } from "../internal";
export default class Fraction {
    constructor(n, d = 1) {
        this.n = n;
        this.d = d;
    }
    toString() {
        return `${this.n}/${this.d}`;
    }
    static dtf(n) {
        let [a, b] = Util.dtf(n);
        return new Fraction(a, b);
    }
    simplified() {
        return null;
    }
    decimal() { return this.n / this.d; }
    plus(other) { return Fraction.dtf(this.decimal() + other.decimal()); }
    minus(other) { return Fraction.dtf(this.decimal() - other.decimal()); }
    times(other) { return Fraction.dtf(this.decimal() * other.decimal()); }
    divide(other) { return Fraction.dtf(this.decimal() / other.decimal()); }
}
//# sourceMappingURL=Fraction.js.map