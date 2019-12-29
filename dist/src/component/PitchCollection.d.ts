import { Connectable } from "../internal";
export default class PitchCollection {
    components: Connectable[];
    add(c: Connectable): void;
    numComponents(): number;
}
