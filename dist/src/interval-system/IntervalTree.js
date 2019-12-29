"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
// seperate class for non-null notes?
class IntervalTree extends internal_1.IntervalStructure {
    constructor(root = new internal_1.NullNote()) {
        super();
        this.root = root;
        this.edges.set(root, new Map());
    }
    static ET(base, root = new internal_1.NullNote()) {
        let result = (root instanceof internal_1.NullNote) ? new IntervalTree(root) : new internal_1.RootedIntervalTree(root);
        let curr = root;
        for (let i = 0; i < base - 1; i++) {
            curr = result.connect(curr, new internal_1.ETInterval(1, base));
        }
        return result;
    }
    /**
     * Generate a set of partials from the harmonic series.
     *
     * @param range Range of partial numbers, either specified as an upper bound (inclusive) or an array
     * @param fundamental The `Note` to set as the fundamental (root of the tree). The default value is a `NullNote`, which creates a purely structural `IntervalTree`.
     */
    static harmonicSeries(range, fundamental = new internal_1.NullNote()) {
        let result = (fundamental instanceof internal_1.NullNote) ? new IntervalTree(fundamental) : new internal_1.RootedIntervalTree(fundamental);
        fundamental.isStructural = true;
        if (typeof range == "number") {
            // Array of numbers from 1 to range, inclusive
            range = Array.from(Array(range), (_, i) => i + 1);
        }
        for (let i of range) {
            if (i == 1)
                fundamental.isStructural = false;
            result.connect(result.root, new internal_1.FreqRatio(i));
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
    contains(note) {
        return this.getAllNotes().indexOf(note) != -1;
    }
    connect(from, by) {
        if (this.contains(from)) {
            let newNote = from.noteAbove(by);
            this.addEdge(from, by, newNote);
            return newNote;
        }
        else {
            return null;
        }
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
        let result = new internal_1.RootedIntervalTree(root), thisQueue = [this.root], resultQueue = [root], visited = new Map();
        for (let note of this.getAllNotes())
            visited.set(note, false);
        while (thisQueue.length) {
            let c1 = thisQueue.pop(), c2 = resultQueue.pop();
            visited.set(c1, true);
            for (let neighbor of this.getNeighbors(c1)) {
                if (!visited.get(neighbor)) {
                    // add the current interval to get the next note
                    let currInterval = this.getInterval(c1, neighbor);
                    let next = result.connect(c2, currInterval);
                    thisQueue.unshift(neighbor);
                    resultQueue.unshift(next);
                }
            }
        }
        return result;
    }
}
exports.default = IntervalTree;
//# sourceMappingURL=IntervalTree.js.map