"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class ETMapping extends internal_1.Mapping {
    constructor(base, notesPerOctave = 12) {
        super(notesPerOctave);
        this.base = base;
        this.zeroNote = (new internal_1.ETPitch(this.zero)).asET(this.base);
    }
    getIntervalByIndex(key) {
        // if base is less than the number of playable steps, repeat them 
        let scaledKey = Math.round(key * this.base / this.notesPerOctave);
        return new internal_1.ETInterval(scaledKey, this.base);
    }
}
exports.default = ETMapping;
//# sourceMappingURL=ETMapping.js.map