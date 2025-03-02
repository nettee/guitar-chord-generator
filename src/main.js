import {ChordBox} from './chordbox.js';

function drawChord(id, chord) {
  const sel = `#${id}`;
  new ChordBox(sel, {
    numFrets: 4,
  }).draw(chord);
}

let F = {
  chord: [[1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 1]],
  barres: [
    { fromString: 6, toString: 1, fret: 1 },
  ],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

let G = {
  chord: [[1, 3], [2, 3], [3, 0], [4, 0], [5, 2], [6, 3]],
  tuning: ['R', 'T', '5', 'R', '5', 'R'],
};

let Em = {
  chord: [[1, 0], [2, 0], [3, 0], [4, 2], [5, 2], [6, 0]],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

let Am = {
  chord: [[1, 0], [2, 1], [3, 2], [4, 2], [5, 0], [6, 0]],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

let Dm = {
  chord: [[1, 1], [2, 3], [3, 2], [4, 0], [5, 0], [6, 0]],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

let C = {
  chord: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 3], [6, 0]],
  tuning: ['R', '5', 'R', 'T', '5', 'R'],
};

const groupName = 'C-4536251';

const chordElements = document.querySelectorAll('.chord-group .chord');
const ids = [];
for (let i = 0; i < chordElements.length; i++) {
  const id = `group-${groupName}-chord-${i + 1}`;
  chordElements[i].setAttribute('id', id);
  ids.push(id);
}

const chords = [F, G, Em, Am, Dm, G, C];

for (let i = 0; i < chords.length; i++) {
  drawChord(ids[i], chords[i]);
}

