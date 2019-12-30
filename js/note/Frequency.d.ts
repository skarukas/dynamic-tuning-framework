import { Interval, Note } from "../internal";
export default class Frequency extends Note {
    freq: number;
    noteAbove(interval: Interval): Note;
    transposeBy(interval: Interval): void;
    getETPitch(base?: number): number;
    getFrequency(): number;
    constructor(freq: number);
}
