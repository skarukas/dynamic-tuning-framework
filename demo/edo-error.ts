import { Interval, Util, FreqRatio, ET, ETInterval } from "../index";

// demonstrating the "error" of different EDOs in representing pure prime ratios

// generate prime harmonics up to 7
let intervals: Interval[] = Util.generatePrimes(7).map((n) => new FreqRatio(n));

// check EDOs from 6 to 53 against these harmonics (same as the normalized intervals 5/4, 3/2, 7/4)
for (let base = 6; base <= 53; base++) {
    console.log("RMS for " + base + "-ET: " + ET.errorInET(intervals, base));
}
// minima for 3, 5, 7 are found at 12, 15, 19, 22, 31, 41, 53 (53 is the best by far)

// this does it another way
console.log(ET.bestFitET(intervals));
console.log(ET.bestFitETs(intervals));

// which ET's can represent both 12- and 19-ET the best?
intervals = [new ETInterval(1), new ETInterval(1, 19)]
console.log(ET.bestFitETs(intervals));