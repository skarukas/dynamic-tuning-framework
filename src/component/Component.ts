import Note from "../note/Note";
import Interval from "../interval/Interval";
import Connectable from "./Connectable";

export default abstract class Component implements Connectable {
    constructor(private root: Note) { }
    public notes: Note[];
    abstract connect(other: Connectable, by: Interval): Component;
    abstract setInterval(a: Note, b: Note, interval: Interval): void;
    abstract add();
    abstract remove(v: Note): boolean;
    getRoot() { return this.root; }
    getAllNotes(): Note[] { return this.notes; }
    getNoteById(id: string): Note {
        for (let note of this.notes) {
            if (note.id == id)
                return note;
        }
    }
    transposeBy(interval: Interval): void {
        for (let note of this.notes)
            note.transposeBy(interval);
    }
    filter(callback: (Note) => boolean): Note[] {
        return this.notes.filter(callback);
    }
}
