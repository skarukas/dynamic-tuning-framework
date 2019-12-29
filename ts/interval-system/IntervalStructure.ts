import { Note, Interval } from "../internal"

export default class IntervalStructure {
    protected edges: Map<Note, Map<Note, Interval>>;
    constructor() {
        this.edges = new Map<Note, Map<Note, Interval>>();
    }
}