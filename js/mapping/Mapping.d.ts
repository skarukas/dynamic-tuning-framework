import { Note, Interval } from "../internal";
export default abstract class Mapping {
    /**
     * Number of MIDI pitches between each octave on the input device (must be an integer). Defaults to 12.
     */
    protected readonly notesPerOctave: number;
    /**
     * Interval between each repetition of the scale. Defaults to an octave.
     */
    protected readonly octaveSize: Interval;
    /**
     * The input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    protected root: number;
    protected fixedInput: number;
    protected fixedOutput: Note;
    constructor(notesPerOctave?: number, repeatInterval?: Interval);
    protected abstract getIntervalByScaleIndex(key: number): Interval;
    get(key: number): Note;
}
