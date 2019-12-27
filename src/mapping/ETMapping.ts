import { Mapping, ETPitch, ETInterval, Interval, Util, Note } from "../internal";

export default class ETMapping extends Mapping {
    protected getIntervalByIndex(key: number): Interval {
        // if base is less than the number of playable steps, repeat them 
        let scaledKey = Math.round(key * this.base / this.notesPerOctave);
        return new ETInterval(scaledKey, this.base);
    }
    constructor(private base: number, notesPerOctave: number = 12) { 
        super(notesPerOctave);
    }

    /*
    private reduce: (key: number) => number = this.stretch;
    setMethod(method: string): void {
        method = method.toLowerCase();
        if (method == "stretch") this.reduce = this.stretch;
        if (method == "round") this.reduce = this.round;
        else throw new Error("Method must be 'stretch' or 'round'");
    }
    private stretch(key: number): number {
        return this.zero
    }
    */
}