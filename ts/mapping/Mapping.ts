//import { Util, Note, ETInterval, Interval, ETPitch } from "../internal";


// export default abstract class Mapping {
//     /**
//      * Number of MIDI pitches between each octave on the input device (must be an integer). Defaults to 12.
//      */
//     protected readonly notesPerOctave: number;
//     /**
//      * Interval between each repetition of the scale. Defaults to an octave.
//      */
//     protected readonly octaveSize: Interval;
//     /**
//      * The input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
//      */
//     protected root = 60;
//     protected fixedInput = 60;
//     protected fixedOutput: Note;

//     constructor(notesPerOctave: number = 12, repeatInterval: Interval = Interval.octave) { 
//         this.notesPerOctave = notesPerOctave;
//         this.octaveSize = repeatInterval;
//     }
//     protected abstract getIntervalByScaleIndex(key: number): Interval;
//     get(key: number): Note {
//         // find scale degree and octave offset
//         let diff: number = (key - this.fixedInput),
//             numOctaves: number = Math.floor(diff / this.notesPerOctave),
//             scaleIndex = Util.mod(diff, this.notesPerOctave),
//             // retrieve interval from scale degree
//             dist: Interval = this.getIntervalByScaleIndex(scaleIndex),
//             // get untransposed result
//             result: Note = this.fixedOutput.noteAbove(dist);
//         // transpose result to the right "octave"
//         return result.noteAbove(this.octaveSize.multiply(numOctaves));
//     }
// }