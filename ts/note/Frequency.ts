import {Interval, Note, Util } from "../internal";

export default class Frequency extends Note {
    noteAbove(interval: Interval): Note {
        let copy = new Frequency(this.freq);
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
