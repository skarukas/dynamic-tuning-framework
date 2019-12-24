import { IntervalTree } from "../internal";

export default class RootedIntervalTree extends IntervalTree {
    inverse(): IntervalTree {
        return super.inverse().withRoot(this.root);
    }
}