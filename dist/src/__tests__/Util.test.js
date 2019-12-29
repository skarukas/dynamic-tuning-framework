"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
test("rounding works correctly", () => {
    for (let i = 0; i < 100; i++) {
        // random decimals (-500 <= n <= 500)
        let num = Math.random() * 1000 - 500;
        for (let places = 0; places < 13; places++) {
            expect(index_1.Util.round(num, places)).toBeCloseTo(num, places - 1);
            expect(index_1.Util.round(num, places)).toBeCloseTo(num, places - 1);
        }
    }
    for (let places = 0; places < 15; places++) {
        expect(index_1.Util.round(Math.PI, places)).toBeCloseTo(Math.PI, places - 1);
        expect(index_1.Util.round(Math.E, places)).toBeCloseTo(Math.E, places - 1);
    }
});
test("rational approximations round to the right number of places", () => {
    for (let i = 0; i < 100; i++) {
        // random decimals (-500 <= n <= 500)
        let num = Math.random() * 1000 - 500;
        for (let places = 0; places < 10; places++) {
            let [a, b] = index_1.Util.dtf(num, places);
            expect(num).toBeCloseTo(a / b, places - 1);
        }
    }
    expect(index_1.Util.dtf(0)).toEqual([0, 1]);
});
test("the number of primes up to n is within bounds", () => {
    for (let i = 0; i < 100; i++) {
        let n = Math.random() * 3000 + 55;
        let numPrimes = index_1.Util.primesUpTo(n).length;
        // test bounds proven by Rosser
        expect(numPrimes).toBeLessThan(n / (Math.log(n) - 4));
        expect(numPrimes).toBeGreaterThan(n / (Math.log(n) + 2));
    }
});
// reset prime array
index_1.Util.__primes = [];
test("correct primes are generated for small numbers", () => {
    expect(index_1.Util.primesUpTo(0)).toEqual([]);
    expect(index_1.Util.primesUpTo(1)).toEqual([]);
    expect(index_1.Util.primesUpTo(1.99)).toEqual([]);
    expect(index_1.Util.primesUpTo(2)).toEqual([2]);
    expect(index_1.Util.primesUpTo(2.99)).toEqual([2]);
    expect(index_1.Util.primesUpTo(100)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]);
});
// reset prime array
index_1.Util.__primes = [];
test("prime array for decimals is same as floor", () => {
    for (let i = 0; i < 100; i++) {
        let n = Math.random() * 3000 + 55;
        let floor = Math.floor(n);
        expect(index_1.Util.primesUpTo(n)).toEqual(index_1.Util.primesUpTo(floor));
    }
});
test("calculates largest prime factor", () => {
});
//# sourceMappingURL=Util.test.js.map