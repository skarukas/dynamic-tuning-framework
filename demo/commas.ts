import {FreqRatio, MIDINote, JI, Util, ET, Interval, ETInterval } from "../index";

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
console.log(pythagorean);