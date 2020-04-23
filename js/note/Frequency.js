"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Frequency extends internal_1.Note {
    constructor(freq) {
        super();
        this.freq = freq;
        if (!(freq > 0))
            throw new RangeError("Frequencies must be greater than zero.");
    }
    /** The frequency of the note, e.g. "500 Hz"  */
    get name() {
        return this.__name__ || this.freq.toFixed() + " Hz";
    }
    /** or a custom name. */
    set name(val) { this.__name__ = val; }
    noteAbove(interval) {
        let copy = new Frequency(this.freq);
        copy.transposeBy(interval);
        return copy;
    }
    transposeBy(interval) {
        this.freq *= interval.asFrequency().decimal();
    }
    getETPitch(base = 12) {
        return internal_1.Util.freqToET(this.freq, base);
    }
    getFrequency() {
        return this.freq;
    }
}
exports.default = Frequency;
//# sourceMappingURL=Frequency.js.map