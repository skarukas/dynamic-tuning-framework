import { Interval, Fraction } from "../internal";
export default abstract class FracInterval extends Interval {
    protected frac: Fraction;
    constructor(n: number, d?: number);
    get n(): number;
    get d(): number;
    set n(val: number);
    set d(val: number);
}
