import Interval from "../interval/Interval";
import Util from "../Util";
import Note from "./Note";

export default class Frequency extends Note {
    noteAbove(interval: Interval): Note {
        let copy = Object.assign({} as Frequency, this);
        copy.transposeBy(interval);
        return copy;
    }
    transposeBy(interval: Interval): void {
        this.freq *= interval.asFrequency().decimal();
    }
    getETPitch(): number {
        return Util.freqToET(this.freq);
    }
    getFrequency(): number {
        return this.freq;
    }
    constructor(public freq: number) {
        super();
    }
}
