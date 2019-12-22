import Util from "../Util";
import PitchedObj from "../note/PitchedObj";
import ETInterval from "./ETInterval";
import FreqRatio from "./FreqRatio";

// Intervals are generally meant to be immutable
export default abstract class Interval implements PitchedObj {
    // static comparison functions
    static compareSize(_a: Interval, _b: Interval): number {
        let a = _a.asET(), b = _b.asET();
        return a.n - b.n;
    }
    static compareComplexity(_a: Interval, _b: Interval): number {
        let a = _a.asFrequency(), b = _b.asFrequency(), x = a.largestPrimeFactor(), y = b.largestPrimeFactor();
        return (x != y) ? x - y : (a.n + a.d) - (b.n + b.d);
    }
    abstract inverse(): Interval;
    abstract add(other: Interval): Interval;
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }
    abstract multiply(factor: number): Interval;
    divide(n: number): Interval {
        return this.multiply(1 / n);
    }
    abstract asFrequency(): FreqRatio;
    abstract asET(base?: number): ETInterval;
    cents(): number {
        return Util.round(this.asET().steps * 100, 2);
    }
    equals(other: Interval): boolean {
        return this.cents() - other.cents() < 1E-2;
    }
    abstract normalized(): Interval; // compressed to an octave
    errorInET(base: number = 12): number {
        let et = this.getNearestET(base);
        return this.subtract(et).cents();
    }
    getNearestET(base: number = 12): ETInterval {
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
}
