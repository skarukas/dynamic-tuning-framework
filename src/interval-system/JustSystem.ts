import FreqRatio from "../interval/FreqRatio";
import Util from "../Util";
import IntervalSystem from "./IntervalSystem";

export default class JustSystem extends IntervalSystem {
    constructor(public readonly limit: number = 5) {
        super();
        // generators set as whole numbers, don't use 2
        let primes = Util.generatePrimes(limit).slice(1);
        this.generators = primes.map((n: number) => new FreqRatio(n));
    }
}
