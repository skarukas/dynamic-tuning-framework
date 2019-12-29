"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class JustSystem extends internal_1.IntervalSystem {
    constructor(limit = 5) {
        super();
        this.limit = limit;
        // generators set as whole numbers, don't use 2
        let primes = internal_1.Util.primesUpTo(limit).slice(1);
        this.generators = primes.map((n) => new internal_1.FreqRatio(n));
    }
}
exports.default = JustSystem;
//# sourceMappingURL=JustSystem.js.map