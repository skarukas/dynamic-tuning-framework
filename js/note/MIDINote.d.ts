import { ETPitch } from "../internal";
export default class MIDINote extends ETPitch {
    pitch: number;
    velocity: number;
    constructor(pitch: number, velocity?: number);
}
