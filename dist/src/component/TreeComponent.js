"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class TreeComponent extends internal_1.Component {
    setInterval(a, b, interval) {
        let diff = interval.subtract(a.intervalTo(b)), descendants = this.getSubTree(b, a);
        // transpose b and all its descendants (to preserve other intervals)
        for (let note of descendants)
            note.transposeBy(diff);
    }
    getNeighbors(note) {
        return this.edges.get(note).keys();
    }
    getSubTree(curr = this.getRoot(), parent) {
        let result = [curr];
        // DFS style tree traversal
        for (let note of this.getNeighbors(curr)) {
            if (note != parent)
                result = result.concat(this.getSubTree(note, curr));
        }
        return result;
    }
    // BFS traversal, may be useful at some point
    /*     transposeTree(interval: Interval, curr: Note = this.root, parent?: Note): void {
            let neighbors: IterableIterator<Note> = this.edges.get(curr).keys();
            for (let note of neighbors) {
                if (note != parent) {
                    note.transposeBy(interval);
                    this.transposeTree(interval, note, curr);
                }
            }
        } */
    connect(other, by) {
        let a = this.getRoot(), b = other.getRoot();
        by = by || a.intervalTo(b);
        // copy all edges and notes into this instance
        this.notes = this.notes.concat(other.getAllNotes());
        if (other instanceof TreeComponent) {
            for (let [key, val] of other.edges)
                this.edges.set(key, val);
        }
        else {
            this.edges.set(b, new Map());
        }
        // connect b and a
        this.edges.get(a).set(b, by);
        this.edges.get(b).set(a, by.inverse());
        // adjust connected bit
        let diff = by.subtract(a.intervalTo(b));
        other.transposeBy(diff);
        return this;
    }
    add() {
        /**
         *
         * do something here
         */
    }
    remove(v) {
        let hasKey = this.edges.delete(v);
        if (hasKey) {
            for (let m of this.edges.values())
                m.delete(v);
            // reassess roots etc.??
            //
            //
        }
        return hasKey;
    }
}
exports.default = TreeComponent;
//# sourceMappingURL=TreeComponent.js.map