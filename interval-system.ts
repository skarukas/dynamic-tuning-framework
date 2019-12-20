import { FreqRatio, Interval } from "./intervals";
import { Util } from "./util";

class IntervalSystem {
    // the interval system will be defined 
    generators: Interval[];
}

class JustSystem extends IntervalSystem {
    constructor(public readonly limit: number = 5) {
        super();
        
        // generators set as whole numbers, don't use 2
        let primes = Util.generatePrimes(limit).slice(1);
        this.generators = primes.map((n: number) => new FreqRatio(n));
    }
}

function powerMod(n, base) {
    let log = Math.log(n) / Math.log(base);
    let mod = ((log % 1) + 1) % 1;
    return base**mod;
}

// array of arrays, where each array is a level l of the n-ary tree
// n is number of generator primes
// length of a level's array is n^l
// upon adding a level, only the parent "reference" array must be copied and resized, not the children
// parent(i) = floor(i/n)

/* let generators: Interval[];

function generatePowerTree(width, depth) {
    let lastLevel = [Array(width).fill(0)],
        result = lastLevel;
    // generate another level of the interval tree
    for (let rep = 0; rep < depth; rep++) {
        let currLevel = [];
        for (let parent of lastLevel) {
            // increase or decrease powers 
            for (let t = 0; t < width; t++) {
                let copy;
                if (parent[t] >= 0) {
                    copy = parent.slice();
                    copy[t]++;
                    currLevel.push(copy);
                }
                if (parent[t] <= 0) {
                    copy = parent.slice();
                    copy[t]--;
                    currLevel.push(copy);
                }
            }
        }
        result = result.concat(currLevel);
        lastLevel = currLevel;
    }
    return result;
} */

// generates a list of STRINGS of intervals in ascending order. A little yucky atm.
function generatePowerTree2(depth, generators = [3, 5, 7]) {
    let width = generators.length;
    let lastLevel = new Set<number>(), result = lastLevel;
    lastLevel.add(1);
    // generate another level of the interval tree
    for (let rep = 0; rep < depth; rep++) {
        let currLevel = new Set<number>();
        for (let parent of lastLevel) {
            // increase or decrease powers
            for (let t = 0; t < width; t++) {
                let copy;
                if (parent[t] >= 0) {
                    copy = powerMod(parent * generators[t], 2);
                    currLevel.add(copy);
                }
                if (parent[t] <= 0) {
                    copy = powerMod(parent / generators[t], 2);
                    currLevel.add(copy);
                }
            }
        }
        for (let elem of currLevel) result.add(elem as number); 
        lastLevel = currLevel;
    }

    let strings = new Set();
    for (let p of result) strings.add(Util.dtf(p));
    return Array.from(strings).sort((a: string, b: string) => eval(a)-eval(b));
}

/* 
for testing only
function dtf(n, err = 1E-9) {
    var x = n,
        a = Math.floor(x),
        h1 = 1,
        h2,
        k1 = 0,
        k2,
        h = a,
        k = 1;
 
    while (x-a > err*k*k) {
        x = 1/(x-a);
        a = Math.floor(x);
        h2 = h1; h1 = h;
        k2 = k1; k1 = k;
        h = h2 + a*h1;
        k = k2 + a*k1;
    }
    return h + "/" + k;
} */