"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Fraction {
    constructor(n, d = 1) {
        this.n = n;
        this.d = d;
    }
    toString() {
        return `${this.n}/${this.d}`;
    }
    static dtf(n) {
        let [a, b] = internal_1.Util.dtf(n);
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
exports.default = Fraction;
//# sourceMappingURL=Fraction.js.map