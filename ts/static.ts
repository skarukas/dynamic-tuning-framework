import { IntervalTree, JI } from "./internal";

/**
 * Namespace for static code, to avoid problems due to module loading order
 */

{
    let chromatic = new IntervalTree(),
        r1 = chromatic.root,
        r2 = chromatic.connectAbove(r1, JI.fifth),
        r3 = chromatic.connectAbove(r2, JI.fifth),
        r0 = chromatic.connectBelow(r1, JI.fifth);
    chromatic.connectAbove(r0, JI.third);
    chromatic.connectAbove(r1, JI.third);
    chromatic.connectAbove(r2, JI.third);
    chromatic.connectAbove(r3, JI.third);
    
    chromatic.connectBelow(r0, JI.third);
    chromatic.connectBelow(r1, JI.third);
    chromatic.connectBelow(r2, JI.third);
    chromatic.connectBelow(r3, JI.third);

    IntervalTree.chromaticFiveLimit = chromatic;

    let diatonic = new IntervalTree();

    r1 = chromatic.root;
    r2 = chromatic.connectAbove(r1, JI.fifth);
    r3 = chromatic.connectAbove(r1, JI.fifth);
    r0 = chromatic.connectBelow(r1, JI.fifth);

    chromatic.connectAbove(r0, JI.third);
    chromatic.connectAbove(r1, JI.third);
    chromatic.connectAbove(r2, JI.third);

    IntervalTree.diatonicFiveLimit = diatonic;
}