import * as internals from "./internal";
const tune = {
    // classes
    ETPitch: callableClass(internals.ETPitch),
    MIDINote: callableClass(internals.MIDINote),
    Frequency: callableClass(internals.Frequency),
    NullNote: callableClass(internals.NullNote),
    IntervalTree: callableClass(internals.IntervalTree),
    Note: callableClass(internals.Note),
    Scale: callableClass(internals.Scale),
    ETInterval: callableClass(internals.ETInterval),
    FreqRatio: callableClass(internals.FreqRatio),
    // namespaces
    JI: internals.JI,
    Util: internals.Util,
    ET: internals.ET,
    AdaptiveTuning: internals.AdaptiveTuning,
};
export default tune;
/**
 * Makes the `new` keyword optional for a class.
 */
function callableClass(MyClass) {
    return new Proxy(MyClass, {
        apply: (target, thisArg, argumentsList) => new target(...argumentsList)
    });
}
//# sourceMappingURL=tune.js.map