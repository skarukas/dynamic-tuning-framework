import { IntervalStructure, Interval, Note, RootedIntervalTree } from "../internal";
export default class IntervalTree extends IntervalStructure {
    root: Note;
    static chromaticFiveLimit: IntervalTree;
    static diatonicFiveLimit: IntervalTree;
    constructor(root?: Note);
    static ET(base: number, root?: Note): IntervalTree;
    /**
     * Generate a set of partials from the harmonic series.
     *
     * @param range Range of partial numbers, either specified as an upper bound (inclusive) or an array
     * @param fundamental The `Note` to set as the fundamental (root of the tree). The default value is a `NullNote`, which creates a purely structural `IntervalTree`.
     */
    static harmonicSeries(range: number | number[], fundamental?: Note): IntervalTree;
    getAllNotes(): Note[];
    addEdge(from: Note, by: Interval, to: Note): void;
    contains(note: Note): boolean;
    connectAbove(from: Note, by: Interval): Note;
    connectBelow(from: Note, by: Interval): Note;
    inverse(): IntervalTree;
    private getNeighbors;
    private getInterval;
    withRoot(root: Note): RootedIntervalTree;
}
