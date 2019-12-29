"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
// Intervals are generally meant to be immutable
class Interval {
    // static comparison functions
    static compareSize(_a, _b) {
        let a = _a.asET(), b = _b.asET();
        return a.n - b.n;
    }
    static compareComplexity(_a, _b) {
        let a = _a.asFrequency(), b = _b.asFrequency(), x = a.largestPrimeFactor(), y = b.largestPrimeFactor();
        return (x != y) ? x - y : (a.n + a.d) - (b.n + b.d);
    }
    /**
     * Compress the interval to an octave.
     */
    normalized() {
        return this.mod(Interval.octave);
    }
    subtract(other) {
        return this.add(other.inverse());
    }
    divide(n) {
        return this.multiply(1 / n);
    }
    cents() {
        return internal_1.Util.round(this.asET().steps * 100, 2);
    }
    equals(other) {
        return this.cents() - other.cents() < 1E-2;
    }
    errorInET(base = 12) {
        let et = this.getNearestET(base);
        return this.subtract(et).cents();
    }
    getNearestET(base = 12) {
        let et = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
}
exports.default = Interval;
//# sourceMappingURL=Interval.js.map