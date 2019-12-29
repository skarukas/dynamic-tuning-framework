"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Mapping {
    constructor(notesPerOctave = 12) {
        this.zero = 60;
        this.notesPerOctave = notesPerOctave;
        this.repeatInterval = internal_1.Interval.octave;
    }
    get(key) {
        // find scale degree and octave offset
        let diff = (key - this.zero), numOctaves = Math.floor(diff / this.notesPerOctave), scaleIndex = internal_1.Util.mod(diff, this.notesPerOctave), 
        // retrieve interval from scale degree
        dist = this.getIntervalByIndex(scaleIndex), 
        // get untransposed result
        result = this.zeroNote.noteAbove(dist);
        // transpose result to the right "octave"
        return result.noteAbove(this.repeatInterval.multiply(numOctaves));
    }
}
exports.default = Mapping;
//# sourceMappingURL=Mapping.js.map