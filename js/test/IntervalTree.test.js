"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
test("Connecting returns the new note", () => {
    let root = new internal_1.ETPitch(10), tree = new internal_1.IntervalTree(root);
    expect(tree.connectAbove(root, new internal_1.ETInterval(10))).toEqual(new internal_1.ETPitch(20));
});
test("Cannot connect from a Note not in the tree", () => {
    let root = new internal_1.ETPitch(40), copy = new internal_1.ETPitch(40), tree = new internal_1.IntervalTree(root);
    expect(() => tree.connectAbove(copy, new internal_1.ETInterval(3))).toThrow();
    expect(tree.connectAbove(root, new internal_1.ETInterval(3))).toEqual(new internal_1.ETPitch(43));
    expect(() => tree.connectAbove(new internal_1.ETPitch(10), new internal_1.FreqRatio(5, 3))).toThrow();
});
//# sourceMappingURL=IntervalTree.test.js.map