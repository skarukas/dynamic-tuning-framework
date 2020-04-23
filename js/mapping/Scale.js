"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
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
class Scale {
    constructor(notesPerOctave = 12, octaveSize = internal_1.Interval.octave, middleCPitch = internal_1.Note.middleC.asET(notesPerOctave)) {
        /**
         * The input note at which to begin the scale.
         * Any integer equivalent mod `notesPerOctave` will produce the same result.
         */
        this.root = 60;
        /**
         * `Scale.fixedInput` and `Scale.fixedOutput` create the link between the input `number`
         *   and the output `Note` and determine the pitch level of the output.
         */
        this.fixedInput = 60;
        if (!Number.isInteger(notesPerOctave))
            throw new Error("Number of notes per octave must be an integer.");
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
    get(input) {
        if (!Number.isInteger(input))
            throw new Error("Scale inputs must be integers.");
        let diff = input - this.root, [numOctaves, index] = internal_1.Util.divide(diff, this.notesPerOctave), interval = this.getIntervalByScaleIndex(index), rootNote = this.getRootNote(), scaledInterval = interval.add(this.octaveSize.multiply(numOctaves));
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
    set(input, value) {
        if (!Number.isInteger(input))
            throw new Error("Scale inputs must be integers.");
        // get index within input scale
        let modIndex = internal_1.Util.mod(input - this.root, this.notesPerOctave), 
        // create interval from the root note (if not already an interval)
        interval = (value instanceof internal_1.Note) ? this.getRootNote().intervalTo(value) : value;
        if (modIndex == 0)
            throw new Error("Can't change the root of a mapping");
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
    setByIndex(index, value) {
        if (!internal_1.Util.isValidIndex(index, this.notesPerOctave))
            throw new RangeError("Scale indices must be integers in the range [0, notesPerOctave).");
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
    setFixedMapping(input, output) {
        // Transpose `input` and `output` until `input` is an index in the scale range
        let [numOctaves, index] = internal_1.Util.divide(input, this.notesPerOctave);
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
    setRoot(root) {
        if (!Number.isInteger(root))
            throw new RangeError("Input values must be integers.");
        this.root = internal_1.Util.mod(root, this.notesPerOctave);
        return this;
    }
    /** Set the scale indices to be entirely equal-tempered `Intervals` according to `Scale.notesPerOctave`. */
    equallyDivide() {
        let base = this.notesPerOctave, step = this.octaveSize.equals(internal_1.Interval.octave) ? new internal_1.ETInterval(1, base) : this.octaveSize.divide(base).asET(base);
        for (let i = 0; i < base; i++)
            this.map[i] = step.multiply(i);
    }
    /** Retrieves the `Interval` by an index with validation. */
    getIntervalByScaleIndex(index) {
        let valid = internal_1.Util.isValidIndex(index, this.notesPerOctave);
        if (valid)
            return this.map[index];
        else
            throw new RangeError("Index out of range. This should not happen unless notesPerOctave was modified.");
    }
    /** Retrieve the root as a `Note`.*/
    getRootNote() {
        let diff = this.fixedInput - this.root, [numOctaves, index] = internal_1.Util.divide(diff, this.notesPerOctave), fixedInterval = this.getIntervalByScaleIndex(index);
        return this.fixedOutput.noteBelow(fixedInterval.add(this.octaveSize.multiply(numOctaves)));
    }
    /** Display the Scale as a set of `Intervals` */
    toString() {
        return this.map.toString();
    }
}
exports.default = Scale;
//# sourceMappingURL=Scale.js.map