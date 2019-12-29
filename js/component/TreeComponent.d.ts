import { Component, Note, Interval, Connectable } from "../internal";
export default class TreeComponent extends Component {
    private edges;
    setInterval(a: Note, b: Note, interval: Interval): void;
    private getNeighbors;
    private getSubTree;
    connect(other: Connectable, by?: Interval): Component;
    add(): void;
    remove(v: Note): boolean;
}
