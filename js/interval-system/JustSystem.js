import { IntervalSystem, Util, FreqRatio } from "../internal";
export default class JustSystem extends IntervalSystem {
    constructor(limit = 5) {
        super();
        this.limit = limit;
        // generators set as whole numbers, don't use 2
        let primes = Util.primesUpTo(limit).slice(1);
        this.generators = primes.map((n) => new FreqRatio(n));
    }
}
//# sourceMappingURL=JustSystem.js.map