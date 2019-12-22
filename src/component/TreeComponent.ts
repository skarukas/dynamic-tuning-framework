import Note from "../note/Note";
import Interval from "../interval/Interval";
import Connectable from "./Connectable";
import Component from "./Component";

export default class TreeComponent extends Component {
    private edges: Map<Note, Map<Note, Interval>>;
    setInterval(a: Note, b: Note, interval: Interval): void {
        let diff: Interval = interval.subtract(a.intervalTo(b)), descendants: Note[] = this.getSubTree(b, a);
        // transpose b and all its descendants (to preserve other intervals)
        for (let note of descendants)
            note.transposeBy(diff);
    }
    private getNeighbors(note: Note): IterableIterator<Note> {
        return this.edges.get(note).keys();
    }
    private getSubTree(curr: Note = this.getRoot(), parent?: Note): Note[] {
        let result: Note[] = [curr];
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
    connect(other: Connectable, by?: Interval): Component {
        let a = this.getRoot(), b = other.getRoot();
        by = by || a.intervalTo(b);
        // copy all edges and notes into this instance
        this.notes = this.notes.concat(other.getAllNotes());
        if (other instanceof TreeComponent) {
            for (let [key, val] of other.edges)
                this.edges.set(key, val);
        }
        else {
            this.edges.set(b, new Map<Note, Interval>());
        }
        // connect b and a
        this.edges.get(a).set(b, by);
        this.edges.get(b).set(a, by.inverse());
        // adjust connected bit
        let diff: Interval = by.subtract(a.intervalTo(b));
        other.transposeBy(diff);
        return this;
    }
    add() {
        /**
         *
         * do something here
         */
    }
    remove(v: Note): boolean {
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
