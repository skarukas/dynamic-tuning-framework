import { Note, Util, PitchedObj, Interval, ETInterval } from "../internal";

export default class Scale {
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
    private root = 60;
    private fixedInput = 60;
    private fixedOutput: Note;
    private map: Interval[];

    constructor(notesPerOctave: number = 12, octaveSize: Interval = Interval.octave, middleCPitch: Note = Note.middleC.asET(notesPerOctave)) {
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
    setFixedMapping(input: number, output: Note): Scale {
        // Transpose `input` and `output`  down until `input` is an index in the scale range
        let [numOctaves, index] = Util.divide(input, this.notesPerOctave);
        this.fixedInput = index;
        this.fixedOutput = output.noteBelow(this.octaveSize.multiply(numOctaves));
        return this;
    }
    /**
     * Set the input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
     */
    setRoot(root: number): Scale {
        if (!Number.isInteger(root)) throw new RangeError("Input values must be integers.");
        this.root = Util.mod(root, this.notesPerOctave);
        return this;
    }
    private equallyDivide(): void {
        let base = this.notesPerOctave,
            step = this.octaveSize.equals(Interval.octave)? new ETInterval(1, base) : this.octaveSize.divide(base).asET(base);
        for (let i = 0; i < base; i++) this.map[i] = step.multiply(i);
    }

    getIntervalByScaleIndex(index: number): Interval {
        let valid = Util.isValidIndex(index, this.notesPerOctave);
        if (valid) return this.map[index];
        else throw new RangeError("Index out of range.");
    }
    private getRootNote() {
        let diff = this.fixedInput - this.root,
            [numOctaves, index] = Util.divide(diff, this.notesPerOctave),
            fixedInterval = this.getIntervalByScaleIndex(index);
        return this.fixedOutput.noteBelow(fixedInterval.add(this.octaveSize.multiply(numOctaves)));
    }
    get(note: number): Note {
        let diff = note - this.root,
            [numOctaves, index] = Util.divide(diff, this.notesPerOctave),
            interval = this.getIntervalByScaleIndex(index),
            rootNote = this.getRootNote(),
            scaledInterval = interval.add(this.octaveSize.multiply(numOctaves));
        return rootNote.noteAbove(scaledInterval);
    }
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     * 
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index: number, value: PitchedObj): Scale {
        // get index within input scale
        let modIndex = Util.mod(index - this.root, this.notesPerOctave),
            // create interval from the root note (if not already an interval)
            interval = (value instanceof Note)? this.getRootNote().intervalTo(value) : value as Interval;

        if (modIndex == 0) throw new Error("Can't change the root of a mapping");
        // resize interval to be within scale range and set value
        this.map[modIndex] = interval.mod(this.octaveSize);
        return this;
    }
    toString(): string {
        return this.map.toString();
    }
}