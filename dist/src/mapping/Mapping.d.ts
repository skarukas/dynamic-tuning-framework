import { Note, Interval } from "../internal";
export default abstract class Mapping {
    /**
     * Number of MIDI pitches between each octave on the input device (must be an integer). Defaults to 12.
     */
    notesPerOctave: number;
    /**
     * Interval between each repetition of the scale. Defaults to an octave.
     */
    repeatInterval: Interval;
    zero: number;
    zeroNote: Note;
    constructor(notesPerOctave?: number);
    protected abstract getIntervalByIndex(key: number): Interval;
    get(key: number): Note;
}
