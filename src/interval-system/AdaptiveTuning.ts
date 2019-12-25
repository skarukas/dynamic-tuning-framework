import { Note, Util } from "../internal";

const AdaptiveTuning = {
    currTimbre: null,
    calculateDissonance(notes: Note[]) { 
        /*
            assuming it's practical to implement sethares's algorithm
        */
    },
    bestFitPartials(notes: Note[], error = 0.5): number[] {
        let freqs = notes.map(n => n.getFrequency());
        return AdaptiveTuning.bestFitPartialsFromFreq(freqs, error);
    },
    bestFitPartialsFromFreq(freqs: number[], error = 0.5): number[] {
        let min = Util.getMin(freqs)[1],
            ratios = freqs.map(n => n / min),
            partials = Array(freqs.length),
            f: number;

        for (let i = 1; true; i++) {
            f = min / i;
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
        return partials;
    }
}

export default AdaptiveTuning;