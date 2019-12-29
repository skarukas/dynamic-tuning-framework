"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class ETPitch extends internal_1.Note {
    constructor(pitch, base = 12) {
        super();
        this.pitch = pitch;
        this.base = base;
    }
    toString() {
        return `${this.pitch} [/${this.base}]`;
    }
    noteAbove(interval) {
        let newPitch = this.pitch + interval.asET(this.base).steps;
        return new this.constructor(newPitch, this.base);
    }
    transposeBy(interval) {
        this.pitch += interval.asET(this.base).steps;
    }
    getETPitch(base = 12) {
        return this.pitch * this.base / base;
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