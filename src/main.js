import { ChordBox } from '/dist/bundle.js';

let chordBox = new ChordBox('#chord1', {
  // showTuning: false,
});

chordBox.draw({
  chord: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
  // optional: position marker
  // position: 5, // start render at fret 5

  // positionText: 4,

  // optional: barres for barre chords
  barres: [
    { fromString: 6, toString: 1, fret: 1 },
    // { fromString: 5, toString: 3, fret: 3 }
  ],

  // optional: tuning keys
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
});
