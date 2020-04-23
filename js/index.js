"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const internals = __importStar(require("./internal"));
const publicClasses = [
    "ETPitch",
    "MIDINote",
    "Frequency",
    "NullNote",
    "IntervalTree",
    "Note",
    "Scale",
    "ETInterval",
    "FreqRatio",
];
const publicNamespaces = [
    "JI",
    "Util",
    "AdaptiveTuning",
];
// export class constructors directly
for (let name of publicClasses) {
    exports[name] = callableClass(internals[name]);
}
// export namespaces as objects
for (let name of publicNamespaces) {
    exports[name] = internals[name];
}
/**
 * Makes the `new` keyword optional for a class.
 */
function callableClass(MyClass) {
    const handler = { apply: (target, thisArg, argumentsList) => new target(...argumentsList) };
    return new Proxy(MyClass, handler);
}
//# sourceMappingURL=index.js.map