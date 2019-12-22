import FreqRatio from "../interval/FreqRatio";
import Interval from "../interval/Interval";
import Connectable from "../component/Connectable";
import Component from "../component/Component";
import TreeComponent from "../component/TreeComponent";
import PitchedObj from "./PitchedObj";
import MIDINote from "./MIDINote";
import ETPitch from "./ETPitch";
import Frequency from "./Frequency";

export default abstract class Note implements Connectable, PitchedObj {
    id: string; // for non-unique identification independent from actual pitch/freq, such as letter note name
    structural: boolean = false; // structural notes are not played back and exist purely to give structure to the pitch tree
    /**
     * use for filtering:
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
    connect(other: Connectable, by: Interval): Component {
        let result = new TreeComponent(this);
        return result.connect(other, by);
    }
}
