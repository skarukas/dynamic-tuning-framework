import { Mapping, Note, Util, PitchedObj, Interval, ETPitch, FreqRatio, ETInterval } from "../internal";

export default class ScaleMapping extends Mapping {
    constructor(notesPerOctave: number = 12) {
        super(notesPerOctave);
        for (let i = 0; i < notesPerOctave; i++) {
            // default to an ET scale
            this.map[i] = new ETInterval(i, notesPerOctave);
        }
        this.zeroNote = (new ETPitch(this.zero)).asET(this.notesPerOctave);
    }
    map: Interval[] = new Array(this.notesPerOctave);
    protected getIntervalByIndex(key: number): Interval {
        return this.map[key];
    }
    /**
     * Map a MIDI pitch to a certain note.
     * All added values become part of the octave-repeating scale.
     * 
     * @param index An integer (MIDI pitch) that will map to `value`.
     * @param value May be specified as an `Interval` above the root or as a `Note`, whose difference from middle C is used.
     */
    set(index: number, value: PitchedObj): void {
        // get index within input scale
        let modIndex = Util.mod(index, this.notesPerOctave),
            // create interval from the fixed "zero" note (if not already an interval)
            interval = (value instanceof Note)? (new ETPitch(this.zero)).intervalTo(value) : value as Interval;

        if (modIndex == 0) throw new Error("Can't change the root of a mapping");
        // resize interval to be within scale range and set value
        this.map[modIndex] = interval.mod(this.repeatInterval);
    }
    toString(): string {
        return this.map.toString();
    }
}