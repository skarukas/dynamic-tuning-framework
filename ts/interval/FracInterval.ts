import {Interval, Fraction} from "../internal";

/** Any `Interval` type that has an internal `Fraction` representation, whether in pitch or frequency space. */
export default abstract class FracInterval extends Interval {
    constructor(n: number, d: number = 1) {
        super();
        this.frac = new Fraction(n, d);
    }
    /** The encapsulated fraction representation and getters/setters. */
    protected frac: Fraction;
    get n() { return this.frac.n; }
    get d() { return this.frac.d; }
    set n(val) { this.frac.n = val; }
    set d(val) { this.frac.d = val; }
}
