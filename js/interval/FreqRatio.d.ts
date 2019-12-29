import { FracInterval, Fraction, ETInterval, Interval } from "../internal";
export default class FreqRatio extends FracInterval {
    constructor(n: number, d?: number);
    static fromFraction(frac: Fraction): FreqRatio;
    largestPrimeFactor(): number;
    decimal(): number;
    valueOf(): string;
    mod(modulus: Interval): FreqRatio;
    multiply(factor: number): FreqRatio;
    asFrequency(): FreqRatio;
    asET(base?: number): ETInterval;
    inverse(): FreqRatio;
    add(other: FreqRatio): FreqRatio;
}
