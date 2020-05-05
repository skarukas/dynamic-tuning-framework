import { PitchedObj, FreqRatio, Frequency, ETPitch, MIDINote, TreeComponent } from "../internal";
export default class Note extends PitchedObj {
    constructor() {
        super(...arguments);
        this.isStructural = false; // structural notes are not played back and exist purely to give structure to the pitch tree
    }
    /**
     * Returns a function that checks whether a `Note` is within a frequency range, inclusive.
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inFreqRange(lo, hi) {
        return function (note) {
            let freq = note.getFrequency();
            return freq >= lo && freq <= hi;
        };
    }
    /**
     * Returns a function that checks whether a `Note` is within a 12ET pitch range, inclusive.
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inPitchRange(lo, hi) {
        return function (note) {
            let pitch = note.getETPitch();
            return pitch >= lo && pitch <= hi;
        };
    }
    // not sure about this
    getAllNotes() {
        return [this];
    }
    /**
     * Create an equal division of an `Interval` into `div` parts, place them above the note,
     * and collect the resulting `Notes` in an array.
     *
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesAbove(interval, div) {
        let innerCount = Math.ceil(div) - 1, divided = interval.divide(div), result = [], curr = this;
        // add all divided bits
        for (let i = 0; i < innerCount; i++) {
            curr = curr.noteAbove(divided);
            result.push(curr);
        }
        // add the top note
        result.push(this.noteAbove(interval));
        return result;
    }
    /**
     * Create an equal division of an `Interval` into `div` parts, place them below the note,
     * and collect the resulting `Notes` in an array.
     *
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesBelow(interval, div) {
        return this.dividedNotesAbove(interval.inverse(), div);
    }
    /** Return the `Note` that is a given `Interval` below. */
    noteBelow(interval) {
        return this.noteAbove(interval.inverse());
    }
    /** Return the `FreqRatio` between this `Note` and another. */
    intervalTo(other) {
        return new FreqRatio(other.getFrequency(), this.getFrequency());
    }
    getRoot() { return this; }
    asFrequency() {
        return new Frequency(this.getFrequency());
    }
    asET(base) {
        return new ETPitch(this.getETPitch(base), base);
    }
    errorInET(base = 12, from = new MIDINote(0)) {
        let interval = from.intervalTo(this);
        return interval.errorInET(base);
    }
    cents() {
        return ETPitch.middleC.intervalTo(this).normalized().cents();
    }
    connect(other, by) {
        let result = new TreeComponent(this);
        return result.connect(other, by);
    }
}
//# sourceMappingURL=Note.js.map