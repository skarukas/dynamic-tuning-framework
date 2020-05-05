import * as internals from "./internal";
declare const tune: {
    ETPitch: typeof internals.ETPitch & F;
    MIDINote: typeof internals.MIDINote & F;
    Frequency: typeof internals.Frequency & F;
    NullNote: typeof internals.NullNote & F;
    IntervalTree: typeof internals.IntervalTree & F;
    Note: typeof internals.Note & F;
    Scale: typeof internals.Scale & F;
    ETInterval: typeof internals.ETInterval & F;
    FreqRatio: typeof internals.FreqRatio & F;
    JI: {
        third: internals.FreqRatio;
        fifth: internals.FreqRatio;
        seventh: internals.FreqRatio;
        eleventh: internals.FreqRatio;
    };
    Util: {
        round: (n: number, places?: number) => number;
        log: (n: number, base: number) => number;
        log2: (n: number) => number;
        mod: (n: number, base: number) => number;
        divide: (n: number, d: number) => [number, number];
        powerMod: (n: number, base: number) => number;
        absCeil: (n: number) => number;
        refA: number;
        ETToFreq: (pitch: number, base?: number) => number;
        freqToET: (freq: number, base?: number) => number;
        pitchToChromaticNoteName: (pitch: number) => string;
        dtf(n: number, places?: number): number[];
        __primes__: any[];
        primesUpTo(limit: number): number[];
        largestPrimeFactor(n: number): number;
        getPairs<T>(arr: T[]): T[][];
        getMin<T_1>(arr: T_1[], lessThan?: (a: T_1, b: T_1) => boolean): {
            index: number;
            value: T_1;
        };
        isValidIndex: (index: number, length: number) => boolean;
    };
    ET: {
        bestFitET(pitched: internals.PitchedObj | internals.PitchedObj[], maxBase?: number): number;
        bestFitETs(pitched: internals.PitchedObj | internals.PitchedObj[], maxBase?: number, howMany?: number): number[];
        errorInET(pitched: internals.PitchedObj | internals.PitchedObj[], base?: number, metric?: string): number;
        stepSizeForET(base: number): number;
    };
    AdaptiveTuning: {
        bestFitPartials(notes: internals.Note[], error?: number): {
            partials: number[];
            fundamental: number;
            asTree(): internals.IntervalTree;
        };
        bestFitPartialsFromFreq(freqs: number[], error?: number): {
            partials: number[];
            fundamental: number;
            asTree(): internals.IntervalTree;
        };
    };
};
export default tune;
declare type F = {
    (...args: any): any;
};
