import { Interval, FreqRatio, ETInterval } from "./intervals";
import { Util } from "./util";

export interface Connectable {
    connect(other: Connectable, by: Interval): Component; // rename??
    getRoot(): Note;
    getAllNotes(): Note[];
    transposeBy(interval: Interval): void;
}

export abstract class Note implements Connectable {
    id: string; // for non-unique identification independent from actual pitch/freq, such as letter note name
    structural: boolean = false; // structural notes are not played back and exist purely to give structure to the pitch tree

    /**
     * use for filtering
     * myCollection.filter(Note.inFreqRange(200, 300));
     */
    static inFreqRange(lo: number, hi: number): (note: Note) => boolean {
        return function(note: Note): boolean {
            let freq: number = note.getFrequency();
            return freq >= lo && freq <= hi;
        }
    }
    static inPitchRange(lo: number, hi: number): (note: Note) => boolean {
        return function(note: Note): boolean {
            let pitch: number = note.getETPitch();
            return pitch >= lo && pitch <= hi;
        }
    }
    getAllNotes(): Note[] {
        return [this];
    }

    // what if someone transposes it and it's still part of a Component?
    abstract transposeBy(interval: Interval): void; // mutator
    addInterval(interval: Interval): Note { // non-mutator
        let copy = Object.assign({} as Note, this);
        copy.transposeBy(interval);
        return copy;
    }
    abstract getETPitch(): number;
    abstract getFrequency(): number;
    abstract intervalTo(other: Note): Interval;

    getRoot() { return this }

    asFrequency(): Frequency {
        return new Frequency(this.getFrequency());
    }
    asMIDINote(velocity?: number): MIDINote {
        return new MIDINote(this.getETPitch(), velocity);
    }

    connect(other: Connectable, by: Interval): Component {
        let result = new TreeComponent(this);
        return result.connect(other, by);
    }
}

export class MIDINote extends Note {
    transposeBy(interval: Interval): void {
        this.pitch += interval.asET().steps;
    }
    intervalTo(other: Note): Interval {
        return new ETInterval(other.getETPitch() - this.getETPitch());
    }
    getETPitch(): number {
       return this.pitch;
    }
    getFrequency(): number {
        return Util.ETToFreq(this.pitch);
    }
    constructor(public pitch: number, public velocity: number = 60) { 
        super();
    }
}

export class Frequency extends Note {
    transposeBy(interval: Interval): void {
        this.freq *= interval.asRatio().decimal();
    }
    intervalTo(other: Note): Interval {
        return new FreqRatio(other.getFrequency(), this.getFrequency());
    }
    getETPitch(): number {
        return Util.freqToET(this.freq);
    }
    getFrequency(): number {
        return this.freq;
    }
    constructor(public freq: number) { 
        super();
    }
}

abstract class Component implements Connectable {
    constructor(private root: Note) {}
    public notes: Note[];

    abstract connect(other: Connectable, by: Interval): Component;
    abstract setInterval(a: Note, b: Note, interval: Interval): void;
    abstract add();
    abstract remove(v: Note): boolean;

    getRoot() { return this.root }
    getAllNotes(): Note[] { return this.notes }
    getNoteById(id: string): Note {
        for (let note of this.notes) {
            if (note.id == id) return note;
        }
    }
    transposeBy(interval: Interval): void {
        for (let note of this.notes) note.transposeBy(interval);
    }
    filter(callback: (Note) => boolean): Note[] {
        return this.notes.filter(callback);
    }
}

export class TreeComponent extends Component {
    private edges: Map<Note, Map<Note, Interval>>;

    setInterval(a: Note, b: Note, interval: Interval): void {
        let diff: Interval = interval.subtract(a.intervalTo(b)),
            descendants: Note[] = this.getSubTree(b, a);

        // transpose b and all its descendants (to preserve other intervals)
        for (let note of descendants) note.transposeBy(diff);
    }
    private getNeighbors(note: Note): IterableIterator<Note> {
        return this.edges.get(note).keys();
    }
    private getSubTree(curr: Note = this.getRoot(), parent?: Note): Note[] {
        let result: Note[] = [curr];
        // DFS style tree traversal
        for (let note of this.getNeighbors(curr)) {
            if (note != parent) result = result.concat(this.getSubTree(note, curr));
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
        let a = this.getRoot(),
            b = other.getRoot();
        by = by || a.intervalTo(b);

        // copy all edges and notes into this instance
        this.notes = this.notes.concat(other.getAllNotes());
        if (other instanceof TreeComponent) {
            for (let [key, val] of other.edges) this.edges.set(key, val);
        } else {
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
            for (let m of this.edges.values()) m.delete(v);

            // reassess roots etc.??
            //
            //
        }
        return hasKey;
    }
}