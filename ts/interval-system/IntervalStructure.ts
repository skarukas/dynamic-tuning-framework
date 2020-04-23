import { Note, Interval } from "../internal"

export default class IntervalStructure {
    /** The `Intervals` in the structure, indexed by the two `Notes` that form them. */
    protected edges: Map<Note, Map<Note, Interval>>;
    constructor() {
        this.edges = new Map<Note, Map<Note, Interval>>();
    }
}