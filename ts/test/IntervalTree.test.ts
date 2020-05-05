import tune from "../tune";

test("Connecting returns the new note",() => {
    let root = tune.ETPitch(10),
        tree = tune.IntervalTree(root); 

    expect(tree.connectAbove(root, tune.ETInterval(10))).toEqual(tune.ETPitch(20));
})

test("Cannot connect from a Note not in the tree",() => {
    let root = tune.ETPitch(40),
        copy = tune.ETPitch(40),
        tree = tune.IntervalTree(root);

    expect(() => tree.connectAbove(copy, tune.ETInterval(3))).toThrow();
    expect(tree.connectAbove(root, tune.ETInterval(3))).toEqual(tune.ETPitch(43));

    expect(() => tree.connectAbove(tune.ETPitch(10), tune.FreqRatio(5, 3))).toThrow();
})