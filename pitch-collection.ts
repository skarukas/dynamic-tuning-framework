import { Interval, ETInterval, FreqRatio } from "./intervals";
import { Util } from "./util";
import { Connectable } from "./connectable";

export class PitchCollection {
    components: Connectable[];
    add(c: Connectable): void {
        this.components.push(c);
    }
    numComponents(): number {
        return this.components.length;
    }
}