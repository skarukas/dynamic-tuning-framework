import { ETPitch } from "../internal";
export default class MIDINote extends ETPitch {
    constructor(pitch, velocity = 60) {
        super(pitch);
        this.pitch = pitch;
        this.velocity = velocity;
    }
}
//# sourceMappingURL=MIDINote.js.map