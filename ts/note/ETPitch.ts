import { Note, Interval, Util, ETInterval } from "../internal";

type Constructor = { new(...args: any): any }

export default class ETPitch extends Note {
    /** The chromatic note name, e.g. "C#"  */
    get name(): string {
        return this.__name__ || Util.pitchToChromaticNoteName(this.getETPitch());
    }

    /** or a custom name. */
    set name(val) { this.__name__ = val }
    
    constructor(public pitch: number, public base: number = 12) {
        super();
        if (isNaN(pitch/base)) throw new RangeError("ET pitch indices must be numeric.");
        if (base == 0) throw new RangeError("Cannot create an equal division of base zero.");
    }
    noteAbove(interval: Interval): Note {
        let newPitch = this.pitch + interval.asET(this.base).steps;
        return new (this.constructor as Constructor)(newPitch, this.base);
    }
    transposeBy(interval: Interval): void {
        this.pitch += interval.asET(this.base).steps;
    }
    getETPitch(base = 12): number {
        return this.pitch * base / this.base;
    }
    getFrequency(): number {
        return Util.ETToFreq(this.pitch, this.base);
    }
    intervalTo(other: Note): ETInterval {
        return new ETInterval(other.getETPitch(this.base) - this.pitch, this.base);
    }
}

Note.middleC = new ETPitch(60);