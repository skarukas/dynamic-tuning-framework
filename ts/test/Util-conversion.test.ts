//import * as tune from "..";
export {} // make it a module
const tune = require("..");

test("Set pitches for middle C, A440, and 0",() => {
    expect(tune.Util.ETToFreq(69)).toBeCloseTo(440);
    expect(tune.Util.ETToFreq(60)).toBeCloseTo(261.63);
    expect(tune.Util.ETToFreq(0)).toBeCloseTo(tune.Util.ETToFreq(0, 19));
})

test("Freq-pitch conversion is invertible", () => {
    for (let i = 0; i < 100; i++) {
        // random decimals (0 <= n < 1000)
        let num = Math.random() * 1000;
        for (let base = 2; base < 24; base++) {
            expect(num).toBeCloseTo(tune.Util.ETToFreq(tune.Util.freqToET(num, base), base));
            expect(num).toBeCloseTo(tune.Util.freqToET(tune.Util.ETToFreq(num, base), base));
        }
    }
})