import { Note, PitchedObj, Interval } from "../internal";
export default class Scale {
    static fiveLimit: Scale;
    /**
     * Number of MIDI pitches between each octave on the input device (must be an integer). Defaults to 12.
     */
    readonly notesPerOctave: number;
    /**
     * Interval between each repetition of the scale. Defaults to an octave.
     */
    readonly octaveSize: Interval;
    /**
     * The input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    private root;
    private fixedInput;
    private fixedOutput;
    private map;
    constructor(notesPerOctave?: number, octaveSize?: Interval, middleCPitch?: Note);
    /**
     * Transposes the entire scale to map `input` to `output`. Does not alter the scale's interval content.
     * @param input
     * @param output
     */
    setFixedMapping(input: number, output: Note): Scale;
    /**
     * Set the input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    setRoot(root: number): Scale;
    private equallyDivide;
    getIntervalByScaleIndex(index: number): Interval;
    private getRootNote;
    get(note: number): Note;
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     *
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index: number, value: PitchedObj): Scale;
    toString(): string;
}
