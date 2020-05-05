import { Note, Util } from "../internal";
export default class Frequency extends Note {
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
        return Util.freqToET(this.freq, base);
    }
    getFrequency() {
        return this.freq;
    }
}
//# sourceMappingURL=Frequency.js.map