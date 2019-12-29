"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Frequency extends internal_1.Note {
    constructor(freq) {
        super();
        this.freq = freq;
    }
    noteAbove(interval) {
        let copy = new Frequency(this.freq);
        copy.transposeBy(interval);
        return copy;
    }
    transposeBy(interval) {
        this.freq *= interval.asFrequency().decimal();
    }
    getETPitch() {
        return internal_1.Util.freqToET(this.freq);
    }
    getFrequency() {
        return this.freq;
    }
}
exports.default = Frequency;
//# sourceMappingURL=Frequency.js.map