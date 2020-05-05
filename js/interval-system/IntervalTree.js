import { IntervalStructure, NullNote, FreqRatio, ETInterval, RootedIntervalTree } from "../internal";
// seperate class for non-null notes?
export default class IntervalTree extends IntervalStructure {
    constructor(root = new NullNote()) {
        super();
        this.root = root;
        this.edges.set(root, new Map());
    }
    /**
     * Generate an ET scale as an `IntervalTree`, connected like a linked list.
     *
     * @param base The number of divisions per octave.
     * @param root The `Note` upon which to start the scale. The default value is a `NullNote`, which creates a purely structural `IntervalTree`.
     */
    static ET(base, root = new NullNote()) {
        let result = (root instanceof NullNote) ? new IntervalTree(root) : new RootedIntervalTree(root);
        let curr = root;
        for (let i = 0; i < base - 1; i++) {
            curr = result.connectAbove(curr, new ETInterval(1, base));
        }
        return result;
    }
    /**
     * Generate a set of partials from the harmonic series.
     *
     * @param range Range of partial numbers, either specified as an upper bound (inclusive) or an array
     * @param fundamental The `Note` to set as the fundamental (root of the tree). The default value is a `NullNote`, which creates a purely structural `IntervalTree`.
     */
    static harmonicSeries(range, fundamental = new NullNote()) {
        let result = (fundamental instanceof NullNote) ? new IntervalTree(fundamental) : new RootedIntervalTree(fundamental);
        fundamental.isStructural = true;
        if (typeof range == "number") {
            // Array of numbers from 1 to range, inclusive
            range = Array.from(Array(range), (_, i) => i + 1);
        }
        for (let i of range) {
            if (i == 1)
                fundamental.isStructural = false;
            result.connectAbove(result.root, new FreqRatio(i));
        }
        return result;
    }
    getAllNotes() {
        return Array.from(this.edges.keys());
    }
    addEdge(from, by, to) {
        this.edges.get(from).set(to, by);
        this.edges.set(to, new Map());
        this.edges.get(to).set(from, by.inverse());
    }
    /**
     * Check if the `IntervalTree` contains the specified `Note`, either by reference or by frequency value.
     *
     * @param note The `Note` to search for.
     */
    contains(note) {
        // check by reference
        if (this.getAllNotes().indexOf(note) != -1)
            return true;
        // check by frequency value
        for (let n of this.getAllNotes()) {
            if (n.equals(note))
                return true;
        }
        return false;
    }
    /**
     * Create a new `Note` a certain interval from a note already in the tree, and add it.
     *
     * @param from The `Note` to connect from
     * @param by The `Interval` to connect by
     * @returns The newly created `Note`.
     */
    connectAbove(from, by) {
        if (this.contains(from)) {
            let newNote = from.noteAbove(by);
            this.addEdge(from, by, newNote);
            return newNote;
        }
        else {
            throw new Error("Cannot connect from a note not in tree.");
        }
    }
    connectBelow(from, by) {
        return this.connectAbove(from, by.inverse());
    }
    // doesn't work for pitch collections, only NullNotes
    inverse() {
        let result = new IntervalTree(this.root);
        for (let a of this.edges.keys()) {
            result.edges.set(a, new Map());
            let map = this.edges.get(a);
            let resultMap = result.edges.get(a);
            for (let b of map.keys()) {
                resultMap.set(b, map.get(b).inverse());
            }
        }
        return result;
    }
    getNeighbors(note) {
        return this.edges.get(note).keys();
    }
    getInterval(from, to) {
        return this.edges.get(from).get(to);
    }
    withRoot(root) {
        let result = new RootedIntervalTree(root), thisQueue = [this.root], resultQueue = [root], visited = new Map();
        for (let note of this.getAllNotes())
            visited.set(note, false);
        while (thisQueue.length) {
            let c1 = thisQueue.pop(), c2 = resultQueue.pop();
            visited.set(c1, true);
            for (let neighbor of this.getNeighbors(c1)) {
                if (!visited.get(neighbor)) {
                    // add the current interval to get the next note
                    let currInterval = this.getInterval(c1, neighbor);
                    let next = result.connectAbove(c2, currInterval);
                    thisQueue.unshift(neighbor);
                    resultQueue.unshift(next);
                }
            }
        }
        return result;
    }
}
//# sourceMappingURL=IntervalTree.js.map