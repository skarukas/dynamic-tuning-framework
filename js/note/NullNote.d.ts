import { Note, Interval, Frequency, ETPitch } from "../internal";
export default class NullNote extends Note {
    transposeBy(interval: Interval): void;
    noteAbove(interval: Interval): Note;
    getETPitch(base?: number): number;
    getFrequency(): number;
    intervalTo(other: Note): Interval;
    asFrequency(): Frequency;
    asET(): ETPitch;
    errorInET(base: number, from: Note): number;
    cents(): number;
}
