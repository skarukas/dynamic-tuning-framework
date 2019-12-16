interface Connectable {
    connect(other: Connectable, by: Interval): Component; // rename??
    getRoot(): Note;
    getAllNotes(): Note[];
    transposeBy(interval: Interval): void;
}

abstract class Note implements Connectable {
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
        let result = new Component(this);
        return result.connect(other, by);
    }
}

class MIDINote extends Note {
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

class Frequency extends Note {
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


class Component implements Connectable {
    constructor(private root: Note) {}
    public notes: Note[];
    private edges: Map<Note, Map<Note, Interval>>;

    getAllNotes(): Note[] {
        return this.notes;
    }
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
    setInterval(a: Note, b: Note, interval: Interval): void {
        let diff: Interval = interval.subtract(a.intervalTo(b)),
            descendants: Note[] = this.getAllDescendants(b, a);

        // transpose b and all its descendants (to preserve other intervals)
        b.transposeBy(diff);
        for (let note of descendants) note.transposeBy(diff);
    }
    private getNeighbors(note: Note): IterableIterator<Note> {
        return this.edges.get(note).keys();
    }
    private getAllDescendants(curr: Note = this.root, parent?: Note): Note[] {
        let result: Note[] = [];
        // DFS style tree traversal
        for (let note of this.getNeighbors(curr)) {
            if (note != parent) result = result.concat(this.getAllDescendants(note, curr));
        }
        return result;
    }
    // idk if this kind of ordered traversal is useful at all
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
        if (other instanceof Component) {
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

    getRoot() { return this.root }
}

class PitchCollection {
    components: Connectable[];
    add(c: Connectable): void {
        this.components.push(c);
    }
    numComponents(): number {
        return this.components.length;
    }
}

// Intervals are generally meant to be immutable
interface Interval {
    inverse(): Interval;
    add(other: Interval): Interval; // maybe make a better name
    subtract(other: Interval): Interval;
    stretch(factor: number): Interval;
    asRatio(): FreqRatio;
    asET(base?: number): ETInterval;
    getNearestET(base?: number): ETInterval; // returns closest integer ET in base
}

class Fraction {
    constructor(public n: number, public d: number = 1) {}
    toString(): string {
        return `${this.n}/${this.d}`;
    }
    static dtf(n: number, err: number = 1E-15) {
        var x = n,
            a = Math.floor(x),
            h1 = 1,
            h2,
            k1 = 0,
            k2,
            h = a,
            k = 1;
     
        while (x-a > err*k*k) {
            x = 1/(x-a);
            a = Math.floor(x);
            h2 = h1; h1 = h;
            k2 = k1; k1 = k;
            h = h2 + a*h1;
            k = k2 + a*k1;
        }
        return new Fraction(h, k);
    }
    decimal(): number { return this.n / this.d  }
    plus(other: Fraction): Fraction   { return Fraction.dtf(this.decimal() + other.decimal()) }
    minus(other: Fraction): Fraction  { return Fraction.dtf(this.decimal() - other.decimal()) }
    times(other: Fraction): Fraction  { return Fraction.dtf(this.decimal() * other.decimal()) }
    divide(other: Fraction): Fraction { return Fraction.dtf(this.decimal() / other.decimal()) }
}

class FreqRatio extends Fraction implements Interval {
    stretch(factor: number): Interval {
        return new FreqRatio(this.n**factor, this.d);
    }
    static fromFraction(frac: Fraction): FreqRatio {
        return new FreqRatio(frac.n, frac.d);
    }
    asRatio(): FreqRatio { return this }
    asET(base: number = 12): ETInterval {
        let num: number = Util.freqToET(this.decimal(), base);
        return new ETInterval(num, base);
    }
    inverse(): Interval {
        return new FreqRatio(this.d, this.n);
    }
    
    add(other: Interval): Interval {
        let product: Fraction = this.times(other.asRatio());
        return FreqRatio.fromFraction(product);
    }


    // both are identical between siblings ... hm
    getNearestET(base: number = 12): ETInterval {
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }
}

class ETInterval extends Fraction implements Interval {
    stretch(factor: number): Interval {
        return new ETInterval(this.n*factor, this.d);
    }
    constructor(public readonly steps: number, public readonly base: number = 12) {
        super(steps, base);
    }
    asRatio(): FreqRatio {
        let freq: number = Util.ETToFreq(this.n, this.base);
        let frac: Fraction = Fraction.dtf(freq);
        return FreqRatio.fromFraction(frac);
    }
    asET(base: number = 12): ETInterval { 
        if (base == this.base) return this;
        return new ETInterval(this.decimal() * base, base);
    }
    inverse(): Interval {
        return new ETInterval(-this.n, this.d);
    }
    add(other: Interval): Interval {
        let _other: ETInterval = other.asET(this.base);
        return new ETInterval(this.n + _other.n, this.base);
    }


    // both are identical between siblings ... hm
    getNearestET(base: number = 12): ETInterval {
        let et: ETInterval = this.asET(base);
        et.n = Math.round(et.n);
        return et;
    }
    subtract(other: Interval): Interval {
        return this.add(other.inverse());
    }
}

const Util = {
    refA: 440,
    log2: (n: number) => Math.log(n) / Math.log(2),
    ETToFreq: (pitch: number, base: number = 12) => this.refA * 2**(pitch / base),
    freqToET: (freq: number, base: number = 12) => base * this.log2(freq / this.refA),
}