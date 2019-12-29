"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
class RootedIntervalTree extends internal_1.IntervalTree {
    inverse() {
        return super.inverse().withRoot(this.root);
    }
    constructor(root) {
        super(root);
    }
}
exports.default = RootedIntervalTree;
//# sourceMappingURL=RootedIntervalTree.js.map