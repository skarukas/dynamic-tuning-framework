"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class Mapping {
    constructor(notesPerOctave = 12, repeatInterval = internal_1.Interval.octave) {
        /**
         * The input note at which to begin the scale. Any integer equivalent mod `notesPerOctave` will produce the same result.
         */
        this.root = 60;
        this.fixedInput = 60;
        this.notesPerOctave = notesPerOctave;
        this.octaveSize = repeatInterval;
    }
    get(key) {
        // find scale degree and octave offset
        let diff = (key - this.fixedInput), numOctaves = Math.floor(diff / this.notesPerOctave), scaleIndex = internal_1.Util.mod(diff, this.notesPerOctave), 
        // retrieve interval from scale degree
        dist = this.getIntervalByScaleIndex(scaleIndex), 
        // get untransposed result
        result = this.fixedOutput.noteAbove(dist);
        // transpose result to the right "octave"
        return result.noteAbove(this.octaveSize.multiply(numOctaves));
    }
}
exports.default = Mapping;
//# sourceMappingURL=Mapping.js.map