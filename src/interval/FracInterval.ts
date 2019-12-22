import Interval from "./Interval";
import Fraction from "./Fraction";

export default abstract class FracInterval extends Interval {
    protected frac: Fraction;
    constructor(n: number, d: number = 1) {
        super();
        this.frac = new Fraction(n, d);
    }
    get n() { return this.frac.n; }
    get d() { return this.frac.d; }
    set n(val) { this.frac.n = val; }
    set d(val) { this.frac.d = val; }
}
