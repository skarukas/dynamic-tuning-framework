import { Note } from "../internal";
/**
 * A `Note` with no pitch, used for interval structures without a definite transposition.
 */
export default class NullNote extends Note {
    /** Either an empty string or a custom name. */
    get name() {
        return this.__name__;
    }
    set name(val) { this.__name__ = val; }
    /** Does nothing. */
    transposeBy(interval) { }
    /** Returns a new `NullNote`. */
    noteAbove(interval) {
        return new NullNote();
    }
    /** Returns `NaN`. */
    getETPitch(base) {
        return NaN;
    }
    /** Returns `NaN`. */
    getFrequency() {
        return NaN;
    }
    /** Returns `null`. */
    intervalTo(other) {
        return null;
    }
    /** Returns `null`. */
    asFrequency() {
        return null;
    }
    /** Returns `null`. */
    asET() {
        return null;
    }
    /** Returns `NaN`. */
    errorInET(base = 12, from) {
        return NaN;
    }
    /** Returns `NaN`. */
    cents() {
        return NaN;
    }
}
//# sourceMappingURL=NullNote.js.map