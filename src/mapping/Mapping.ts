import { Util, Note, ETInterval, Interval, ETPitch } from "../internal";

export default abstract class Mapping {
    /**
     * Number of MIDI pitches between each octave on the input device (must be an integer). Defaults to 12.
     */
    notesPerOctave: number;
    /**
     * Interval between each repetition of the scale. Defaults to an octave.
     */
    repeatInterval: Interval;
    zero = 60;

    constructor(notesPerOctave: number = 12) { 
        this.notesPerOctave = notesPerOctave;
        this.repeatInterval = Interval.octave;
    }
    protected abstract getIntervalByIndex(key: number): Interval;
    get(key: number): Note {
        // find scale degree and octave offset
        let diff: number = (key - this.zero),
            numOctaves: number = Util.absFloor(diff / this.notesPerOctave),
            scaleIndex = Util.mod(diff, this.notesPerOctave),
            // retrieve interval from scale degree
            dist: Interval = this.getIntervalByIndex(scaleIndex),
            // get untransposed result
            result: Note = (new ETPitch(this.zero)).noteAbove(dist);

        // transpose result to the right "octave"
        return result.noteAbove(this.repeatInterval.multiply(numOctaves));
    }
}