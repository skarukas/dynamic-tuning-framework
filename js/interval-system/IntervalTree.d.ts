import { IntervalStructure, Interval, Note, RootedIntervalTree } from "../internal";
export default class IntervalTree extends IntervalStructure {
    root: Note;
    /** An unrooted chromatic just scale built with thirds and fifths. */
    static chromaticFiveLimit: IntervalTree;
    /** An unrooted diatonic just scale built with thirds and fifths. */
    static diatonicFiveLimit: IntervalTree;
    constructor(root?: Note);
    /**
     * Generate an ET scale as an `IntervalTree`, connected like a linked list.
     *
     * @param base The number of divisions per octave.
     * @param root The `Note` upon which to start the scale. The default value is a `NullNote`, which creates a purely structural `IntervalTree`.
     */
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
    /**
     * Check if the `IntervalTree` contains the specified `Note`, either by reference or by frequency value.
     *
     * @param note The `Note` to search for.
     */
    contains(note: Note): boolean;
    /**
     * Create a new `Note` a certain interval from a note already in the tree, and add it.
     *
     * @param from The `Note` to connect from
     * @param by The `Interval` to connect by
     * @returns The newly created `Note`.
     */
    connectAbove(from: Note, by: Interval): Note;
    connectBelow(from: Note, by: Interval): Note;
    inverse(): IntervalTree;
    private getNeighbors;
    private getInterval;
    withRoot(root: Note): RootedIntervalTree;
}
