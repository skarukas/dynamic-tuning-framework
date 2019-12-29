import { Note, FreqRatio, Frequency, ETInterval, ETPitch } from "../internal";
export default interface PitchedObj {
    errorInET(base?: number, from?: Note): number;
    asFrequency(): FreqRatio | Frequency;
    asET(etBase?: number): ETInterval | ETPitch;
    cents(): number;
}
