import { IntervalTree } from "../internal";
export default class RootedIntervalTree extends IntervalTree {
    inverse() {
        return super.inverse().withRoot(this.root);
    }
    constructor(root) {
        super(root);
    }
}
//# sourceMappingURL=RootedIntervalTree.js.map