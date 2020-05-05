import { Interval, Fraction } from "../internal";
/** Any `Interval` type that has an internal `Fraction` representation, whether in pitch or frequency space. */
export default class FracInterval extends Interval {
    constructor(n, d = 1) {
        super();
        this.frac = new Fraction(n, d);
    }
    get n() { return this.frac.n; }
    get d() { return this.frac.d; }
    set n(val) { this.frac.n = val; }
    set d(val) { this.frac.d = val; }
}
//# sourceMappingURL=FracInterval.js.map