import { Note, Util, PitchedObj, Interval, ETInterval } from "../internal";

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

    // ====== Static Predefined Scales ======

    static fiveLimit: Scale;


    /** `Number` of MIDI pitches between each octave in the input (must be an integer). Defaults to 12. */
    readonly notesPerOctave: number;

    /** `Interval` between each repetition of the output scale. Defaults to an octave. */
    readonly octaveSize: Interval;

    /**
     * The input note at which to begin the scale. 
     * Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    private root = 60;

    /**
     * `Scale.fixedInput` and `Scale.fixedOutput` create the link between the input `number` 
     *   and the output `Note` and determine the pitch level of the output.
     */
    private fixedInput = 60;

    /**
     * `Scale.fixedInput` and `Scale.fixedOutput` create the link between the input `number` 
     *   and the output `Note` and determine the pitch level of the output.
     */
    private fixedOutput: Note;

    /** An array with `Scale.notesPerOctave` slots that stores each scale index's `Interval` from the root. */
    private map: Interval[];

    constructor(notesPerOctave: number = 12, octaveSize: Interval = Interval.octave, middleCPitch: Note = Note.middleC.asET(notesPerOctave)) {
        if (!Number.isInteger(notesPerOctave)) throw new Error("Number of notes per octave must be an integer.");
        this.octaveSize = octaveSize;
        this.notesPerOctave = notesPerOctave;
        this.map = new Array(notesPerOctave);
        this.equallyDivide(); // default to `notesPerOctave`-ET
        this.setRoot(60);
        this.setFixedMapping(60, middleCPitch);
    }

    /**
     * Retrieve a `Note` from the input `number` using the `Scale`'s predefined mapping.
     * 
     * @param input The `number` whose corresponding `Note` should be retrieved.
     * @return The corresponding `Note`.
     */
    get(input: number): Note {
        if (!Number.isInteger(input)) throw new Error("Scale inputs must be integers.");

        let diff = input - this.root,
            [numOctaves, index] = Util.divide(diff, this.notesPerOctave),
            interval = this.getIntervalByScaleIndex(index),
            rootNote = this.getRootNote(),
            scaledInterval = interval.add(this.octaveSize.multiply(numOctaves));
        return rootNote.noteAbove(scaledInterval);
    }

    /**
     * Map an input `number` to a certain `Note`.
     * Modifies the octave-repeating scale.
     * 
     * @param input An integer (MIDI pitch) that will map to `value`.
     * @param value May either be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     * @return `this`
     */
    set(input: number, value: PitchedObj): Scale {
        if (!Number.isInteger(input)) throw new Error("Scale inputs must be integers.");
        // get index within input scale
        let modIndex = Util.mod(input - this.root, this.notesPerOctave),
            // create interval from the root note (if not already an interval)
            interval = (value instanceof Note)? this.getRootNote().intervalTo(value) : value as Interval;

        if (modIndex == 0) throw new Error("Can't change the root of a mapping");
        // resize interval to be within scale range and set value
        this.map[modIndex] = interval.mod(this.octaveSize);
        return this;
    }
    /**
     * Change the `Interval`, from the root, of a certain `Note` in the scale.
     * Modifies the octave-repeating scale.
     * 
     * @param index The scale index to change, an integer from 0 to `Scale.notesPerOctave`-1
     * @param value The `Interval` above the root to set it to. Values larger than `Scale.octaveSize` will be transposed.
     * @return `this`
     */
    setByIndex(index: number, value: Interval): Scale {
        if (! Util.isValidIndex(index, this.notesPerOctave)) throw new RangeError("Scale indices must be integers in the range [0, notesPerOctave).");
        this.map[index] = value.mod(this.octaveSize);
        return this;
    }

    /**
     * Transpose the entire scale to map `input` directly to `output`. 
     * In contrast to `set()`, this does NOT alter the scale's interval content.
     * 
     * @param input The input number
     * @param output The sounding `Note` `input` should map to.
     */
    setFixedMapping(input: number, output: Note): Scale {
        // Transpose `input` and `output` until `input` is an index in the scale range
        let [numOctaves, index] = Util.divide(input, this.notesPerOctave);

        // set these as the Scale's reference input and output
        this.fixedInput = index;
        this.fixedOutput = output.noteBelow(this.octaveSize.multiply(numOctaves));

        return this;
    }

    /**
     * Set the input index at which to begin the scale.
     * Essentially changes the "key" of the scale.
     * Any integer congruent mod `notesPerOctave` will produce the same result.
     */
    setRoot(root: number): Scale {
        if (!Number.isInteger(root)) throw new RangeError("Input values must be integers.");

        this.root = Util.mod(root, this.notesPerOctave);

        return this;
    }

    /** Set the scale indices to be entirely equal-tempered `Intervals` according to `Scale.notesPerOctave`. */
    private equallyDivide(): void {
        let base = this.notesPerOctave,
            step = this.octaveSize.equals(Interval.octave)? new ETInterval(1, base) : this.octaveSize.divide(base).asET(base);
        for (let i = 0; i < base; i++) this.map[i] = step.multiply(i);
    }

    /** Retrieves the `Interval` by an index with validation. */
    private getIntervalByScaleIndex(index: number): Interval {
        let valid = Util.isValidIndex(index, this.notesPerOctave);
        if (valid) return this.map[index];
        else throw new RangeError("Index out of range. This should not happen unless notesPerOctave was modified.");
    }

    /** Retrieve the root as a `Note`.*/
    private getRootNote() {
        let diff = this.fixedInput - this.root,
            [numOctaves, index] = Util.divide(diff, this.notesPerOctave),
            fixedInterval = this.getIntervalByScaleIndex(index);
        return this.fixedOutput.noteBelow(fixedInterval.add(this.octaveSize.multiply(numOctaves)));
    }

    /** Display the Scale as a set of `Intervals` */
    toString(): string {
        return this.map.toString();
    }
}