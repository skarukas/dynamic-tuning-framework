import { Interval, Component, Note } from "../internal";

export default interface Connectable {
    connect(other: Connectable, by: Interval): Component; // rename??
    getRoot(): Note;
    getAllNotes(): Note[];
    transposeBy(interval: Interval): void;
}