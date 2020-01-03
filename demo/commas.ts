import {FreqRatio, MIDINote, JI, Util, ET, Interval, ETInterval } from "../ts";

// commas
let syntonic = new FreqRatio(81, 80),
    pythagorean = new FreqRatio(531441, 524288);

let a = new MIDINote(60);
let e1 = a.noteAbove(JI.third),
    e2 = a.noteAbove(JI.fifth.multiply(4)),
    comma = e1.intervalTo(e2).normalized();

console.log(comma.cents() == syntonic.cents());

e1 = a.noteAbove(JI.fifth.multiply(12));
comma = a.intervalTo(e1).normalized();

console.log(comma.cents() - pythagorean.cents());

let e21 = new FreqRatio(5, 4),
    e22 = (new FreqRatio(3, 2)).multiply(4),
    syntonicComma = e22.subtract(e21).normalized();
    
console.log(syntonicComma.cents());

let middleC = new MIDINote(60),
    justE = middleC.noteAbove(new FreqRatio(5, 4)),
    equalTemperedE = middleC.noteAbove(new ETInterval(4, 12)), // 4 semitones in 12-ET
    nineteethToneE = middleC.noteAbove(new ETInterval(6, 19)), // 6 semitones in 19-ET
    twelveError = justE.intervalTo(equalTemperedE).cents(),
    nineteenError = justE.intervalTo(nineteethToneE).cents();

console.log(twelveError, nineteenError); // 

console.log(ET.stepSizeForET(19));