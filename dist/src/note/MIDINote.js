"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class MIDINote extends internal_1.ETPitch {
    constructor(pitch, velocity = 60) {
        super(pitch);
        this.pitch = pitch;
        this.velocity = velocity;
    }
}
exports.default = MIDINote;
//# sourceMappingURL=MIDINote.js.map