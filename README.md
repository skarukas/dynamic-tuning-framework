# tune
Object-oriented TS library for musical tuning of pitch collections.

This (work in progress) library provides object-oriented representations for musical objects such as pitches and intervals. 
Both may be expressed in frequency (Hz) or pitch (MIDI numbers or indexes of an equal tempered scale).

At the moment, one of the main functionalities of the library is providing a shared interface for combined and operating upon these objects, regardless of the unit of measurement. Calculations such as frequency-pitch conversions and fraction simplification are handled behind the scenes.

A simple example is calculating the *syntonic comma*, the octave-normalized difference between the intervals of a just major third (5:4) and four just perfect fifths (3:2):

```javascript
//import { FreqRatio } from "./dynamic-tuning";

let e1 = new FreqRatio(5, 4),
    e2 = (new FreqRatio(3, 2)).multiply(4),
    syntonicComma = e2.subtract(e1).normalized();
    
console.log(syntonicComma.cents()); // 21.51
```
Another example demonstrating flexibility is stacking arbitrarily-measured intervals:
```javascript
//import { MIDINote, FreqRatio, ETInterval } from "./dynamic-tuning";
let middleC = new MIDINote(60),
    justE = middleC.noteAbove(new FreqRatio(5, 4)),
    equalTemperedE = middleC.noteAbove(new ETInterval(4, 12)), // 4 semitones in 12-ET
    nineteenToneE = middleC.noteAbove(new ETInterval(6, 19)), // 6 semitones in 19-ET
    // calculate how much error the equal tempered E's have
    twelveError = justE.intervalTo(equalTemperedE).cents(),
    nineteenError = justE.intervalTo(nineteenToneE).cents();
    
console.log(twelveError, nineteenError); // 13.69 -7.37
```
It's also very easy to calculate the ET's that best represent a given set of intervals, ordered by least error:

```javascript
// import { FreqRatio, ET } from "./dynamic-tuning";

let myIntervals = [new FreqRatio(7, 4), new FreqRatio(5, 4)];

console.log(ET.bestFitETs(myIntervals)); // [ 31, 47, 53, 37, 52, 46, 41, 43, 25, 50 ]


```

Chords (interval structures) are stored as acyclic connected graphs with parallel directed edges, where intervals are represented as edges and pitches as vertices.
They may be stored with or without information as to level of transposition.

The library also includes utility functions such as those for adaptive tuning and scale/chord generation.
