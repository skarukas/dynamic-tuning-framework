import { IntervalSystem } from "../internal";
export default class JustSystem extends IntervalSystem {
    readonly limit: number;
    constructor(limit?: number);
}
