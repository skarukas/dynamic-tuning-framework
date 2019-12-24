import { Note, Interval, Frequency, ETPitch } from "../internal";

export default class NullNote extends Note {
    transposeBy(interval: Interval): void {}
    noteAbove(interval: Interval): Note { 
        return new NullNote(); 
    }
    getETPitch(base?: number): number {
        return NaN;
    }
    getFrequency(): number {
        return NaN;
    }
    intervalTo(other: Note): Interval {
        return null;
    }
    asFrequency(): Frequency {
        return null;
    }
    asET(): ETPitch {
        return null;
    }
    errorInET(base: number = 12, from: Note): number {
        return NaN;
    }
    cents(): number {
        return NaN;
    }
}
