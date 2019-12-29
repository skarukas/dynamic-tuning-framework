import { IntervalTree, Note } from "../internal";

export default class RootedIntervalTree extends IntervalTree {
    inverse(): IntervalTree {
        return super.inverse().withRoot(this.root);
    }
    constructor(root: Note) {
        super(root);
    }
}