import { Note, FreqRatio, Frequency, ETInterval, ETPitch } from "../internal";


export default abstract class PitchedObj {
    abstract errorInET(base?: number, from?: Note): number;
    abstract asFrequency(): FreqRatio | Frequency;
    abstract asET(etBase?: number): ETInterval | ETPitch;
    abstract cents(): number;
    equals(other: PitchedObj): boolean {
        return this.cents() == other.cents();
    }
}