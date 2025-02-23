import {ChordBox} from './chordbox.js';

let F = {
  chord: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
  barres: [
    { fromString: 6, toString: 1, fret: 1 },
  ],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

new ChordBox('#chord1', {
  // showTuning: false,
}).draw(F);

let G = {
  chord: [[1, 3], [2, 3], [3, 0], [4, 0], [5, 2], [6, 3]],
  tuning: ['R', 'T', '5', 'R', '5', 'R'],
};

new ChordBox('#chord2', {
  // showTuning: false,
}).draw(G);

