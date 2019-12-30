import { Interval, Util, FreqRatio, ET, ETInterval, JI } from "../ts/index";

// demonstrating the "error" of different EDOs in representing pure prime ratios

// generate prime harmonics up to 7
let intervals: Interval[] = Util.primesUpTo(7).map((n) => new FreqRatio(n));

// check EDOs from 6 to 53 against these harmonics (same error as the normalized intervals 5/4, 3/2, 7/4)
for (let base = 6; base <= 53; base++) {
    console.log("RMS for " + base + "-ET: " + ET.errorInET(intervals, base));
}
// minima for 3, 5, 7 are found at 12, 15, 19, 22, 31, 41, 53

// this does it another way
console.log("best for 7-limit intervals:",ET.bestFitETs(intervals));

// which ET's can represent both 12- and 19-ET the best?
intervals = [new ETInterval(1, 12), new ETInterval(1, 19)];
console.log("best for both 12 and 19-ET:",ET.bestFitETs(intervals));

// EDOs up to 53 with the most accurate JI sevenths
console.log("best for septimal harmonies:",ET.bestFitETs(JI.seventh));

// EDOs up to 53 with the most accurate JI fifths
console.log("best for 5-limit fifth:",ET.bestFitETs(JI.fifth));

// EDOs up to 53 with 11th harmonic
console.log("best for 11th harmonic:",ET.bestFitETs(JI.eleventh));

// testing that the best ET is the same for an ET pitch (works up until about 450)
let limit = 450;
for (let i = 1; i < limit; i++) {
    let guess = ET.bestFitET(new ETInterval(1, i), limit);
    if (guess != i) console.log("uh oh!", i, guess)
}

let myIntervals = [new FreqRatio(7, 4), new FreqRatio(5, 4)];

console.log(ET.bestFitETs(myIntervals));