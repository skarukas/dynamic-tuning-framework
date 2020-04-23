import { Note, IntervalTree } from "../internal";
/** Namespace for methods that perform various types of adaptive tuning operations. */
declare const AdaptiveTuning: {
    /**
     * Find the subset of the harmonic series that most closely matches the provided pitch collection.
     *
     * @param notes The pitches to be analyzed.
     * @param error Allowable rounding error (in semitones).
     *
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartials(notes: Note[], error?: number): {
        partials: number[];
        fundamental: number;
        asTree(): IntervalTree;
    };
    /**
     * Find the subset of the harmonic series that most closely matches the provided pitch collection.
     *
     * @param freqs An array of pitches to be analyzed, expressed in Hertz.
     * @param error Allowable rounding error (in semitones).
     *
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartialsFromFreq(freqs: number[], error?: number): {
        partials: number[];
        fundamental: number;
        asTree(): IntervalTree;
    };
};
export default AdaptiveTuning;
