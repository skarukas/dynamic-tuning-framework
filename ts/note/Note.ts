import { Connectable, PitchedObj, Interval, FreqRatio, Frequency, ETPitch, MIDINote, Component, TreeComponent } from "../internal";

export default abstract class Note implements Connectable, PitchedObj {
    static middleC: ETPitch;
    id: string; // for non-unique identification independent from actual pitch/freq, such as letter note name
    isStructural: boolean = false; // structural notes are not played back and exist purely to give structure to the pitch tree
    /**
     * Use for filtering:
     * `myCollection.filter(Note.inFreqRange(200, 300))`
     */
    static inFreqRange(lo: number, hi: number): (note: Note) => boolean {
        return function (note: Note): boolean {
            let freq: number = note.getFrequency();
            return freq >= lo && freq <= hi;
        };
    }
    static inPitchRange(lo: number, hi: number): (note: Note) => boolean {
        return function (note: Note): boolean {
            let pitch: number = note.getETPitch();
            return pitch >= lo && pitch <= hi;
        };
    }
    getAllNotes(): Note[] {
        return [this];
    }
    // what if someone transposes it and it's still part of a Component?
    abstract transposeBy(interval: Interval): void; // mutator
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
    dividedNotesBelow(interval: Interval, div: number): Note[] {
        return this.dividedNotesAbove(interval.inverse(), div);
    }
    abstract noteAbove(interval: Interval): Note; // non-mutator
    noteBelow(interval: Interval): Note {
        return this.noteAbove(interval.inverse());
    }
    abstract getETPitch(base?: number): number;
    abstract getFrequency(): number;
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
        return ETPitch.middleC.intervalTo(this).normalized().cents();
    }

    connect(other: Connectable, by: Interval): Component {
        let result = new TreeComponent(this);
        return result.connect(other, by);
    }
}
