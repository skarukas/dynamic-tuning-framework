"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class ETPitch extends internal_1.Note {
    constructor(pitch, base = 12) {
        super();
        this.pitch = pitch;
        this.base = base;
        if (isNaN(pitch / base))
            throw new RangeError("ET pitch indices must be numeric.");
        if (base == 0)
            throw new RangeError("Cannot create an equal division of base zero.");
    }
    /** The chromatic note name, e.g. "C#"  */
    get name() {
        return this.__name__ || internal_1.Util.pitchToChromaticNoteName(this.getETPitch());
    }
    /** or a custom name. */
    set name(val) { this.__name__ = val; }
    noteAbove(interval) {
        let newPitch = this.pitch + interval.asET(this.base).steps;
        return new this.constructor(newPitch, this.base);
    }
    transposeBy(interval) {
        this.pitch += interval.asET(this.base).steps;
    }
    getETPitch(base = 12) {
        return this.pitch * base / this.base;
    }
    getFrequency() {
        return internal_1.Util.ETToFreq(this.pitch, this.base);
    }
    intervalTo(other) {
        return new internal_1.ETInterval(other.getETPitch(this.base) - this.pitch, this.base);
    }
}
exports.default = ETPitch;
internal_1.Note.middleC = new ETPitch(60);
//# sourceMappingURL=ETPitch.js.map