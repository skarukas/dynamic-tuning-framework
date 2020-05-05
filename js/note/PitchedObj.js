export default class PitchedObj {
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
//# sourceMappingURL=PitchedObj.js.map