import { ETPitch } from "../internal";

export default class MIDINote extends ETPitch {
    constructor(public pitch: number, public velocity: number = 60) {
        super(pitch);
    }
}
