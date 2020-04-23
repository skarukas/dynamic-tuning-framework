import { Note, Util, IntervalTree, Frequency } from "../internal";

/** Namespace for methods that perform various types of adaptive tuning operations. */
const AdaptiveTuning = {
    /*     
    // ====== Timbre-based Analysis ======
    currTimbre: null,

    calculateDissonance(notes: Note[]) { 
        // assuming it's practical to implement sethares's algorithm
    }, 
    */

    /**
     * Find the subset of the harmonic series that most closely matches the provided pitch collection.
     * 
     * @param notes The pitches to be analyzed.
     * @param error Allowable rounding error (in semitones).
     * 
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartials(notes: Note[], error = 0.5): { partials: number[], fundamental: number, asTree(): IntervalTree } {
        let freqs = notes.map(n => n.getFrequency());
        return AdaptiveTuning.bestFitPartialsFromFreq(freqs, error);
    },

    /**
     * Find the subset of the harmonic series that most closely matches the provided pitch collection.
     * 
     * @param freqs An array of pitches to be analyzed, expressed in Hertz.
     * @param error Allowable rounding error (in semitones).
     * 
     * @returns An object containing calculated partial numbers of the input array as well as the fundamental frequency in Hertz.
     */
    bestFitPartialsFromFreq(freqs: number[], error = 0.5): { partials: number[], fundamental: number, asTree(): IntervalTree } {
        let min = Util.getMin(freqs).value,
            ratios = freqs.map(n => n / min),
            partials = Array(freqs.length),
            i = 1;

        for (;; i++) {
            let j;
            for (j = 0; j < freqs.length; j++) {
                let partial = ratios[j] * i,
                    freqError = partial / Math.round(partial),
                    pitchError = 12 * Util.log2(freqError);

                if (Math.abs(pitchError) < error) partials[j] = Math.round(partial);
                else break;
            }
            if (j == freqs.length) break;
        }
        let fundamental = min / i;

        return { 
            partials, // array of all partial numbers 
            fundamental, // fundamental pitch in Hz
            asTree(): IntervalTree { // the harmonics series as an `IntervalTree`
                return IntervalTree.harmonicSeries(partials, new Frequency(fundamental));
            }
        };
    }
}

export default AdaptiveTuning;