"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class NullNote extends internal_1.Note {
    transposeBy(interval) { }
    noteAbove(interval) {
        return new NullNote();
    }
    getETPitch(base) {
        return NaN;
    }
    getFrequency() {
        return NaN;
    }
    intervalTo(other) {
        return null;
    }
    asFrequency() {
        return null;
    }
    asET() {
        return null;
    }
    errorInET(base = 12, from) {
        return NaN;
    }
    cents() {
        return NaN;
    }
}
exports.default = NullNote;
//# sourceMappingURL=NullNote.js.map