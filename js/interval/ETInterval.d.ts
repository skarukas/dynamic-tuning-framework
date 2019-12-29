import { FracInterval, Interval, FreqRatio } from "../internal";
export default class ETInterval extends FracInterval {
    readonly steps: number;
    readonly base: number;
    valueOf(): string;
    mod(modulus: Interval): ETInterval;
    multiply(factor: number): Interval;
    constructor(steps: number, base?: number);
    asFrequency(): FreqRatio;
    asET(base?: number): ETInterval;
    inverse(): Interval;
    add(other: Interval): Interval;
}
