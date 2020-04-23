import { Interval, Fraction } from "../internal";
/** Any `Interval` type that has an internal `Fraction` representation, whether in pitch or frequency space. */
export default abstract class FracInterval extends Interval {
    constructor(n: number, d?: number);
    /** The encapsulated fraction representation and getters/setters. */
    protected frac: Fraction;
    get n(): number;
    get d(): number;
    set n(val: number);
    set d(val: number);
}
