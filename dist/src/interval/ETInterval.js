"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class ETInterval extends internal_1.FracInterval {
    constructor(steps, base = 12) {
        super(steps, base);
        this.steps = steps;
        this.base = base;
    }
    valueOf() {
        return `${this.n} [${this.d}ET]`;
    }
    mod(modulus) {
        let other = modulus.asET(this.base), remainder = internal_1.Util.mod(this.n, other.n);
        return new ETInterval(remainder, this.d);
    }
    multiply(factor) {
        return new ETInterval(this.n * factor, this.d);
    }
    asFrequency() {
        let decimal = Math.pow(2, (this.steps / this.base));
        let [a, b] = internal_1.Util.dtf(decimal);
        return new internal_1.FreqRatio(a, b);
    }
    asET(base = 12) {
        if (base == this.base)
            return this;
        return new ETInterval(this.frac.decimal() * base, base);
    }
    inverse() {
        return new ETInterval(-this.n, this.d);
    }
    add(other) {
        let _other = other.asET(this.base);
        return new ETInterval(this.n + _other.n, this.base);
    }
}
exports.default = ETInterval;
//# sourceMappingURL=ETInterval.js.map