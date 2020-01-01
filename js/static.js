"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("./internal");
/**
 * Namespace for static code, to avoid problems due to module loading order
 */
{
    let chromatic = new internal_1.IntervalTree(), r1 = chromatic.root, r2 = chromatic.connectAbove(r1, internal_1.JI.fifth), r3 = chromatic.connectAbove(r2, internal_1.JI.fifth), r0 = chromatic.connectBelow(r1, internal_1.JI.fifth);
    chromatic.connectAbove(r0, internal_1.JI.third);
    chromatic.connectAbove(r1, internal_1.JI.third);
    chromatic.connectAbove(r2, internal_1.JI.third);
    chromatic.connectAbove(r3, internal_1.JI.third);
    chromatic.connectBelow(r0, internal_1.JI.third);
    chromatic.connectBelow(r1, internal_1.JI.third);
    chromatic.connectBelow(r2, internal_1.JI.third);
    chromatic.connectBelow(r3, internal_1.JI.third);
    internal_1.IntervalTree.chromaticFiveLimit = chromatic;
    let diatonic = new internal_1.IntervalTree();
    r1 = chromatic.root;
    r2 = chromatic.connectAbove(r1, internal_1.JI.fifth);
    r3 = chromatic.connectAbove(r1, internal_1.JI.fifth);
    r0 = chromatic.connectBelow(r1, internal_1.JI.fifth);
    chromatic.connectAbove(r0, internal_1.JI.third);
    chromatic.connectAbove(r1, internal_1.JI.third);
    chromatic.connectAbove(r2, internal_1.JI.third);
    internal_1.IntervalTree.diatonicFiveLimit = diatonic;
}
//# sourceMappingURL=static.js.map