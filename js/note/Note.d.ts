import { Connectable, PitchedObj, Interval, Frequency, ETPitch, Component } from "../internal";
export default abstract class Note implements Connectable, PitchedObj {
    static middleC: ETPitch;
    id: string;
    isStructural: boolean;
    /**
     * Use for filtering:
     * `myCollection.filter(Note.inFreqRange(200, 300))`
     */
    static inFreqRange(lo: number, hi: number): (note: Note) => boolean;
    static inPitchRange(lo: number, hi: number): (note: Note) => boolean;
    getAllNotes(): Note[];
    abstract transposeBy(interval: Interval): void;
    dividedNotesAbove(interval: Interval, div: number): Note[];
    dividedNotesBelow(interval: Interval, div: number): Note[];
    abstract noteAbove(interval: Interval): Note;
    noteBelow(interval: Interval): Note;
    abstract getETPitch(base?: number): number;
    abstract getFrequency(): number;
    intervalTo(other: Note): Interval;
    getRoot(): this;
    asFrequency(): Frequency;
    asET(base?: number): ETPitch;
    errorInET(base?: number, from?: Note): number;
    cents(): number;
    connect(other: Connectable, by: Interval): Component;
}
