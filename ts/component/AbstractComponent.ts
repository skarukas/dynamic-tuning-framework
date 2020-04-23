import {Interval, Connectable, Note} from "../internal";

export default abstract class AbstractComponent implements Connectable {
    constructor(private root: Note) { }
    public notes: Note[];
    abstract connect(other: Connectable, by: Interval): AbstractComponent;
    abstract setInterval(a: Note, b: Note, interval: Interval): void;
    abstract add();
    abstract remove(v: Note): boolean;
    getRoot() { return this.root; }
    getAllNotes(): Note[] { return this.notes; }
    getNoteByName(name: string): Note {
        for (let note of this.notes) {
            if (note.name == name)
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
