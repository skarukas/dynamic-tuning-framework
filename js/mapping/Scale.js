"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Scale {
    constructor(notesPerOctave = 12, octaveSize = internal_1.Interval.octave, middleCPitch = internal_1.Note.middleC.asET(notesPerOctave)) {
        /**
         * The input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
         */
        this.root = 60;
        this.fixedInput = 60;
        this.octaveSize = octaveSize;
        this.notesPerOctave = notesPerOctave;
        this.map = new Array(notesPerOctave);
        this.equallyDivide();
        this.setRoot(60);
        this.setFixedMapping(60, middleCPitch);
    }
    /**
     * Transposes the entire scale to map `input` to `output`. Does not alter the scale's interval content.
     * @param input
     * @param output
     */
    setFixedMapping(input, output) {
        // Transpose `input` and `output`  down until `input` is an index in the scale range
        let [numOctaves, index] = internal_1.Util.divide(input, this.notesPerOctave);
        this.fixedInput = index;
        this.fixedOutput = output.noteBelow(this.octaveSize.multiply(numOctaves));
        return this;
    }
    /**
     * Set the input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    setRoot(root) {
        if (!Number.isInteger(root))
            throw new RangeError("Input values must be integers.");
        this.root = internal_1.Util.mod(root, this.notesPerOctave);
        return this;
    }
    equallyDivide() {
        let base = this.notesPerOctave, step = this.octaveSize.equals(internal_1.Interval.octave) ? new internal_1.ETInterval(1, base) : this.octaveSize.divide(base).asET(base);
        for (let i = 0; i < base; i++)
            this.map[i] = step.multiply(i);
    }
    getIntervalByScaleIndex(index) {
        let valid = internal_1.Util.isValidIndex(index, this.notesPerOctave);
        if (valid)
            return this.map[index];
        else
            throw new RangeError("Index out of range.");
    }
    getRootNote() {
        let diff = this.fixedInput - this.root, [numOctaves, index] = internal_1.Util.divide(diff, this.notesPerOctave), fixedInterval = this.getIntervalByScaleIndex(index);
        return this.fixedOutput.noteBelow(fixedInterval.add(this.octaveSize.multiply(numOctaves)));
    }
    get(note) {
        let diff = note - this.root, [numOctaves, index] = internal_1.Util.divide(diff, this.notesPerOctave), interval = this.getIntervalByScaleIndex(index), rootNote = this.getRootNote(), scaledInterval = interval.add(this.octaveSize.multiply(numOctaves));
        return rootNote.noteAbove(scaledInterval);
    }
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     *
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index, value) {
        // get index within input scale
        let modIndex = internal_1.Util.mod(index - this.root, this.notesPerOctave), 
        // create interval from the root note (if not already an interval)
        interval = (value instanceof internal_1.Note) ? this.getRootNote().intervalTo(value) : value;
        if (modIndex == 0)
            throw new Error("Can't change the root of a mapping");
        // resize interval to be within scale range and set value
        this.map[modIndex] = interval.mod(this.octaveSize);
        return this;
    }
    toString() {
        return this.map.toString();
    }
}
exports.default = Scale;
//# sourceMappingURL=Scale.js.map