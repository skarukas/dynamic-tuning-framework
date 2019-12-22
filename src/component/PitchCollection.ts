import { Connectable } from "../internal";

export default class PitchCollection {
    components: Connectable[];
    add(c: Connectable): void {
        this.components.push(c);
    }
    numComponents(): number {
        return this.components.length;
    }
}