import Note from "../note/Note";
import Interval from "../interval/Interval";
import Component from "./Component";

export default interface Connectable {
    connect(other: Connectable, by: Interval): Component; // rename??
    getRoot(): Note;
    getAllNotes(): Note[];
    transposeBy(interval: Interval): void;
}