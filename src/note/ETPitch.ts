import { Note, Interval, Util } from "../internal";

type Constructor = { new(...args: any): any }

export default class ETPitch extends Note {

    toString(): string {
        return `${this.pitch} [/${this.base}]`;
    }
    constructor(public pitch: number, public base: number = 12) {
        super();
    }
    noteAbove(interval: Interval): Note {
        let newPitch = this.pitch + interval.asET(this.base).steps;
        return new (this.constructor as Constructor)(newPitch, this.base);
    }
    transposeBy(interval: Interval): void {
        this.pitch += interval.asET(this.base).steps;
    }
    getETPitch(base = 12): number {
        return this.pitch * this.base / base;
    }
    getFrequency(): number {
        return Util.ETToFreq(this.pitch, this.base);
    }
}

Note.middleC = new ETPitch(60);