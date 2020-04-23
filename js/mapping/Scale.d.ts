import { Note, PitchedObj, Interval } from "../internal";
/**
 * Maps integers (MIDI pitches) to `Notes` according a musical scale.
 * Intervals of repetition may be set for both the input (`notesPerOctave`) and the output (`octaveSize`).
 *
 * Scales are modified by passing `set()` a sample input and a `Note` or `Interval` from the root to map it to.
 *
 * Alternatively, they can be modified by passing `setByIndex()` a scale index and an `Interval` relative to the root.
 *
 * Examples:
 * - `new Scale(19)` creates an octave-repeating 19 note scale which may be mapped to any intervals (defaults to 19TET).
 * - `new Scale(12, JI.fifth)` creates a 12-note scale that repeats at a fifth and whose 12 indices
 *    may be remapped to any interval smaller than a fifth (defaults to equal division).
 */
export default class Scale {
    static fiveLimit: Scale;
    /** `Number` of MIDI pitches between each octave in the input (must be an integer). Defaults to 12. */
    readonly notesPerOctave: number;
    /** `Interval` between each repetition of the output scale. Defaults to an octave. */
    readonly octaveSize: Interval;
    /**
     * The input note at which to begin the scale.
     * Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    private root;
    /**
     * `Scale.fixedInput` and `Scale.fixedOutput` create the link between the input `number`
     *   and the output `Note` and determine the pitch level of the output.
     */
    private fixedInput;
    /**
     * `Scale.fixedInput` and `Scale.fixedOutput` create the link between the input `number`
     *   and the output `Note` and determine the pitch level of the output.
     */
    private fixedOutput;
    /** An array with `Scale.notesPerOctave` slots that stores each scale index's `Interval` from the root. */
    private map;
    constructor(notesPerOctave?: number, octaveSize?: Interval, middleCPitch?: Note);
    /**
     * Retrieve a `Note` from the input `number` using the `Scale`'s predefined mapping.
     *
     * @param input The `number` whose corresponding `Note` should be retrieved.
     * @return The corresponding `Note`.
     */
    get(input: number): Note;
    /**
     * Map an input `number` to a certain `Note`.
     * Modifies the octave-repeating scale.
     *
     * @param input An integer (MIDI pitch) that will map to `value`.
     * @param value May either be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     * @return `this`
     */
    set(input: number, value: PitchedObj): Scale;
    /**
     * Change the `Interval`, from the root, of a certain `Note` in the scale.
     * Modifies the octave-repeating scale.
     *
     * @param index The scale index to change, an integer from 0 to `Scale.notesPerOctave`-1
     * @param value The `Interval` above the root to set it to. Values larger than `Scale.octaveSize` will be transposed.
     * @return `this`
     */
    setByIndex(index: number, value: Interval): Scale;
    /**
     * Transpose the entire scale to map `input` directly to `output`.
     * In contrast to `set()`, this does NOT alter the scale's interval content.
     *
     * @param input The input number
     * @param output The sounding `Note` `input` should map to.
     */
    setFixedMapping(input: number, output: Note): Scale;
    /**
     * Set the input index at which to begin the scale.
     * Essentially changes the "key" of the scale.
     * Any integer congruent mod `notesPerOctave` will produce the same result.
     */
    setRoot(root: number): Scale;
    /** Set the scale indices to be entirely equal-tempered `Intervals` according to `Scale.notesPerOctave`. */
    private equallyDivide;
    /** Retrieves the `Interval` by an index with validation. */
    private getIntervalByScaleIndex;
    /** Retrieve the root as a `Note`.*/
    private getRootNote;
    /** Display the Scale as a set of `Intervals` */
    toString(): string;
}
