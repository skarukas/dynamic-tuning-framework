import {Interval, Note, Util } from "../internal";
type Constructor = { new(...args: any): any }

export default class Frequency extends Note {
    /** The frequency of the note, e.g. "500 Hz"  */
    get name(): string {
        return this.__name__ || this.freq.toFixed() + " Hz";
    }
    
    /** or a custom name. */
    set name(val) { this.__name__ = val }

    noteAbove(interval: Interval): Note {
        let copy = new (this.constructor as Constructor)(this.freq);
        copy.transposeBy(interval);
        return copy;
    }

    transposeBy(interval: Interval): void {
        this.freq *= interval.asFrequency().decimal();
    }

    getETPitch(base: number = 12): number {
        return Util.freqToET(this.freq, base);
    }

    getFrequency(): number {
        return this.freq;
    }

    constructor(public freq: number) {
        super();
        if (! (freq > 0)) throw new RangeError("Frequencies must be greater than zero.");
    }
}
