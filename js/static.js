"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("./internal");
/** Namespace for static code, to avoid problems due to module loading order. */
{
    // create a chromatic just scale
    let chromatic = new internal_1.IntervalTree();
    let c, g, d, f;
    c = chromatic.root;
    g = chromatic.connectAbove(c, internal_1.JI.fifth);
    d = chromatic.connectAbove(g, internal_1.JI.fifth);
    f = chromatic.connectBelow(c, internal_1.JI.fifth);
    chromatic.connectAbove(f, internal_1.JI.third); // a
    chromatic.connectAbove(c, internal_1.JI.third); // e
    chromatic.connectAbove(g, internal_1.JI.third); // b
    chromatic.connectAbove(d, internal_1.JI.third); // f#
    chromatic.connectBelow(f, internal_1.JI.third); // db
    chromatic.connectBelow(c, internal_1.JI.third); // ab
    chromatic.connectBelow(g, internal_1.JI.third); // eb
    chromatic.connectBelow(d, internal_1.JI.third); // bb
    internal_1.IntervalTree.chromaticFiveLimit = chromatic;
    // create a diatonic just scale
    let diatonic = new internal_1.IntervalTree();
    c = diatonic.root;
    g = diatonic.connectAbove(c, internal_1.JI.fifth);
    d = diatonic.connectAbove(g, internal_1.JI.fifth);
    f = diatonic.connectBelow(c, internal_1.JI.fifth);
    diatonic.connectAbove(f, internal_1.JI.third);
    diatonic.connectAbove(c, internal_1.JI.third);
    diatonic.connectAbove(g, internal_1.JI.third);
    internal_1.IntervalTree.diatonicFiveLimit = diatonic;
}
//# sourceMappingURL=static.js.map