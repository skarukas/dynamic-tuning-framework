import ETInterval from "../interval/ETInterval";
import FreqRatio from "../interval/FreqRatio";
import Note from "./Note";
import Frequency from "./Frequency";
import ETPitch from "./ETPitch";

export default interface PitchedObj {
    errorInET(base?: number, from?: Note): number;
    asFrequency(): FreqRatio | Frequency;
    asET(etBase?: number): ETInterval | ETPitch;
}