import {IntervalStructure, NullNote, Interval, FreqRatio, ETInterval, Note, RootedIntervalTree} from "../internal";

// seperate class for non-null notes?
export default class IntervalTree extends IntervalStructure {
    constructor(public root: Note = new NullNote()) { 
        super();
        this.edges.set(root, new Map<Note, Interval>());
    }

    static ET(base: number, root: Note = new NullNote()): IntervalTree { 
        let result = (root instanceof NullNote)? new IntervalTree(root) : new RootedIntervalTree(root);
        let curr = root;

        for (let i = 0; i < base - 1; i++) {
            curr = result.connect(curr, new ETInterval(1, base));
        }
        return result;
    }
    static harmonicSeries(limit: number, root: Note = new NullNote()): IntervalTree { 
        let result = (root instanceof NullNote)? new IntervalTree(root) : new RootedIntervalTree(root);
        //root.structural = true;

        for (let i = 2; i <= limit; i++) {
            result.connect(result.root, new FreqRatio(i));
        }
        return result; 
    }
    getAllNotes(): Note[] {
        return Array.from(this.edges.keys());
    }
    addEdge(from: Note, by: Interval, to: Note): void {
        this.edges.get(from).set(to, by);
        this.edges.set(to, new Map<Note, Interval>());
        this.edges.get(to).set(from, by.inverse());
    }
    contains(note: Note): boolean {
        return this.getAllNotes().indexOf(note) != -1;
    }
    connect(from: Note, by: Interval): Note {
        if (this.contains(from)) {
            let newNote = from.noteAbove(by);
            this.addEdge(from, by, newNote);
            return newNote;
        } else {
            return null;
        }
    }
    // doesn't work for pitch collections, only NullNotes
    inverse(): IntervalTree {
        let result = new IntervalTree(this.root);
        for (let a of this.edges.keys()) {
            result.edges.set(a, new Map<Note, Interval>());
            let map = this.edges.get(a);
            let resultMap = result.edges.get(a);
            for (let b of map.keys()) {
                resultMap.set(b, map.get(b).inverse());
            }
        }
        return result;
    }
    private getNeighbors(note: Note): IterableIterator<Note> {
        return this.edges.get(note).keys();
    }
    private getInterval(from: Note, to: Note): Interval {
        return this.edges.get(from).get(to);
    }
    withRoot(root: Note): RootedIntervalTree {
        let result = new RootedIntervalTree(root),
            thisQueue = [this.root],
            resultQueue = [root],
            visited = new Map<Note, boolean>();

        for (let note of this.getAllNotes()) visited.set(note, false);

        while (thisQueue.length) {
            let c1 = thisQueue.pop(),
                c2 = resultQueue.pop();

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