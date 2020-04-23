"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
/** Any `Interval` type that has an internal `Fraction` representation, whether in pitch or frequency space. */
class FracInterval extends internal_1.Interval {
    constructor(n, d = 1) {
        super();
        this.frac = new internal_1.Fraction(n, d);
    }
    get n() { return this.frac.n; }
    get d() { return this.frac.d; }
    set n(val) { this.frac.n = val; }
    set d(val) { this.frac.d = val; }
}
exports.default = FracInterval;
//# sourceMappingURL=FracInterval.js.map