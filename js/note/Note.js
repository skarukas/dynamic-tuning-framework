"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Note extends internal_1.PitchedObj {
    constructor() {
        super(...arguments);
        this.isStructural = false; // structural notes are not played back and exist purely to give structure to the pitch tree
    }
    /**
     * Use for filtering:
     * `myCollection.filter(Note.inFreqRange(200, 300))`
     */
    static inFreqRange(lo, hi) {
        return function (note) {
            let freq = note.getFrequency();
            return freq >= lo && freq <= hi;
        };
    }
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
    dividedNotesBelow(interval, div) {
        return this.dividedNotesAbove(interval.inverse(), div);
    }
    noteBelow(interval) {
        return this.noteAbove(interval.inverse());
    }
    intervalTo(other) {
        return new internal_1.FreqRatio(other.getFrequency(), this.getFrequency());
    }
    getRoot() { return this; }
    asFrequency() {
        return new internal_1.Frequency(this.getFrequency());
    }
    asET(base) {
        return new internal_1.ETPitch(this.getETPitch(base), base);
    }
    errorInET(base = 12, from = new internal_1.MIDINote(0)) {
        let interval = from.intervalTo(this);
        return interval.errorInET(base);
    }
    cents() {
        return internal_1.ETPitch.middleC.intervalTo(this).normalized().cents();
    }
    connect(other, by) {
        let result = new internal_1.TreeComponent(this);
        return result.connect(other, by);
    }
}
exports.default = Note;
//# sourceMappingURL=Note.js.map