import { IntervalTree, JI } from "./internal";
/** Namespace for static code, to avoid problems due to module loading order. */
{
    // create a chromatic just scale
    let chromatic = new IntervalTree();
    let c, g, d, f;
    c = chromatic.root;
    g = chromatic.connectAbove(c, JI.fifth);
    d = chromatic.connectAbove(g, JI.fifth);
    f = chromatic.connectBelow(c, JI.fifth);
    chromatic.connectAbove(f, JI.third); // a
    chromatic.connectAbove(c, JI.third); // e
    chromatic.connectAbove(g, JI.third); // b
    chromatic.connectAbove(d, JI.third); // f#
    chromatic.connectBelow(f, JI.third); // db
    chromatic.connectBelow(c, JI.third); // ab
    chromatic.connectBelow(g, JI.third); // eb
    chromatic.connectBelow(d, JI.third); // bb
    IntervalTree.chromaticFiveLimit = chromatic;
    // create a diatonic just scale
    let diatonic = new IntervalTree();
    c = diatonic.root;
    g = diatonic.connectAbove(c, JI.fifth);
    d = diatonic.connectAbove(g, JI.fifth);
    f = diatonic.connectBelow(c, JI.fifth);
    diatonic.connectAbove(f, JI.third);
    diatonic.connectAbove(c, JI.third);
    diatonic.connectAbove(g, JI.third);
    IntervalTree.diatonicFiveLimit = diatonic;
}
//# sourceMappingURL=static.js.map