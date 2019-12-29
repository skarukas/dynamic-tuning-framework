"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class ScaleMapping extends internal_1.Mapping {
    constructor(notesPerOctave = 12) {
        super(notesPerOctave);
        this.map = new Array(this.notesPerOctave);
        for (let i = 0; i < notesPerOctave; i++) {
            // default to an ET scale
            this.map[i] = new internal_1.ETInterval(i, notesPerOctave);
        }
        this.zeroNote = (new internal_1.ETPitch(this.zero)).asET(this.notesPerOctave);
    }
    getIntervalByIndex(key) {
        return this.map[key];
    }
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     *
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index, value) {
        // get index within input scale
        let modIndex = internal_1.Util.mod(index, this.notesPerOctave), 
        // create interval from the fixed "zero" note (if not already an interval)
        interval = (value instanceof internal_1.Note) ? (new internal_1.ETPitch(this.zero)).intervalTo(value) : value;
        if (modIndex == 0)
            throw new Error("Can't change the root of a mapping");
        // resize interval to be within scale range and set value
        this.map[modIndex] = interval.mod(this.repeatInterval);
    }
    toString() {
        return this.map.toString();
    }
}
exports.default = ScaleMapping;
//# sourceMappingURL=ScaleMapping.js.map