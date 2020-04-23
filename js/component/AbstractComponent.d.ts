import { Interval, Connectable, Note } from "../internal";
export default abstract class AbstractComponent implements Connectable {
    private root;
    constructor(root: Note);
    notes: Note[];
    abstract connect(other: Connectable, by: Interval): AbstractComponent;
    abstract setInterval(a: Note, b: Note, interval: Interval): void;
    abstract add(): any;
    abstract remove(v: Note): boolean;
    getRoot(): Note;
    getAllNotes(): Note[];
    getNoteByName(name: string): Note;
    transposeBy(interval: Interval): void;
    filter(callback: (Note: any) => boolean): Note[];
}
