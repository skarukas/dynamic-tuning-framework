"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PitchedObj {
    constructor() {
        this.__name__ = "";
    }
    /** Checks if two `PitchedObj`'s are the same size. */
    equals(other) {
        return this.cents() == other.cents();
    }
    toString() {
        return this.name;
    }
}
exports.default = PitchedObj;
//# sourceMappingURL=PitchedObj.js.map