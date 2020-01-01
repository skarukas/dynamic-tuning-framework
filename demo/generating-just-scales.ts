import { ETPitch, FreqRatio, Note, Interval } from "../ts/index";

let C = ETPitch.middleC;

let ETScale: Note[] = C.dividedNotesAbove(Interval.octave, 13);
ETScale.unshift(C);

console.log(ETScale.map(n => n.cents()));