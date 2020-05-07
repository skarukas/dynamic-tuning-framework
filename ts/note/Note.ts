import { Connectable, PitchedObj, Interval, FreqRatio, Frequency, ETPitch, MIDINote, Component, TreeComponent } from "../internal";


export default abstract class Note extends PitchedObj implements Connectable {
    static middleC: ETPitch;
    isStructural: boolean = false; // structural notes are not played back and exist purely to give structure to the pitch tree
    
    /**
     * Returns a function that checks whether a `Note` is within a frequency range, inclusive. 
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inFreqRange(lo: number, hi: number): (note: Note) => boolean {
        return function (note: Note): boolean {
            let freq: number = note.getFrequency();
            return freq >= lo && freq <= hi;
        };
    }

    /**
     * Returns a function that checks whether a `Note` is within a 12ET pitch range, inclusive. 
     * The returned function can be passed to `Array.prototype.filter()`.
     */
    static inPitchRange(lo: number, hi: number): (note: Note) => boolean {
        return function (note: Note): boolean {
            let pitch: number = note.getETPitch();
            return pitch >= lo && pitch <= hi;
        };
    }
    
    // not sure about this
    getAllNotes(): Note[] {
        return [this];
    }

    // what if someone transposes it and it's still part of a Component?
    /** Mutates the `Note` by transposing it up by a certain `Interval`. */
    abstract transposeBy(interval: Interval): void;

    /**
     * Create an equal division of an `Interval` into `div` parts, place them above the note, 
     * and collect the resulting `Notes` in an array.
     * 
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesAbove(interval: Interval, div: number): Note[] {
        let innerCount: number = Math.ceil(div) - 1,
            divided = interval.divide(div),
            result: Note[] = [],
            curr: Note = this;
        
        // add all divided bits
        for (let i = 0; i < innerCount; i++) {
            curr = curr.noteAbove(divided);
            result.push(curr);
        }

        // add the top note
        result.push(this.noteAbove(interval));

        return result;
    }

    /**
     * Create an equal division of an `Interval` into `div` parts, place them below the note, 
     * and collect the resulting `Notes` in an array.
     * 
     * @param interval The interval to divide
     * @param div The number of divisons
     */
    dividedNotesBelow(interval: Interval, div: number): Note[] {
        return this.dividedNotesAbove(interval.inverse(), div);
    }

    /** Return the `Note` that is a given `Interval` above. */
    abstract noteAbove(interval: Interval): Note; // non-mutator

    /** Return the `Note` that is a given `Interval` below. */
    noteBelow(interval: Interval): Note {
        return this.noteAbove(interval.inverse());
    }

    /** Return the pitch class number in a certain, `base` ET. */
    abstract getETPitch(base?: number): number;

    /** Return the frequency in Hertz, as a number. */
    abstract getFrequency(): number;

    /** Return the `FreqRatio` between this `Note` and another. */
    intervalTo(other: Note): Interval {
        return new FreqRatio(other.getFrequency(), this.getFrequency());
    }

    getRoot() { return this; }

    asFrequency(): Frequency {
        return new Frequency(this.getFrequency());
    }

    asET(base?: number): ETPitch {
        return new ETPitch(this.getETPitch(base), base);
    }

    errorInET(base: number = 12, from: Note = new MIDINote(0)): number {
        let interval = from.intervalTo(this);
        return interval.errorInET(base);
    }

    cents(): number {
        return (new ETPitch(0)).intervalTo(this).cents();
    }

    connect(other: Connectable, by: Interval): Component {
        let result = new TreeComponent(this);
        return result.connect(other, by);
    }
}