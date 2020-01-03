import { IntervalTree, ETPitch, ETInterval, FreqRatio } from "../internal";

test("Connecting returns the new note",() => {
    let root = new ETPitch(10),
        tree = new IntervalTree(root);

    expect(tree.connectAbove(root, new ETInterval(10))).toEqual(new ETPitch(20));
})

test("Cannot connect from a Note not in the tree",() => {
    let root = new ETPitch(40),
        copy = new ETPitch(40),
        tree = new IntervalTree(root);

    expect(() => tree.connectAbove(copy, new ETInterval(3))).toThrow();
    expect(tree.connectAbove(root, new ETInterval(3))).toEqual(new ETPitch(43));

    expect(() => tree.connectAbove(new ETPitch(10), new FreqRatio(5, 3))).toThrow();
})