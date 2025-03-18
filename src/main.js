// TODO 本文件不再使用了，可删除
import {ChordBox} from './chordbox.js';

function drawChord(id, chord) {
  const sel = `#${id}`;
  new ChordBox(sel, {
    numFrets: 4,
  }).draw(chord);
}

let hasModified = false;

// TODO 重构代码
function draw_4536251() {
  if (hasModified) return; // 如果已经执行过，直接返回
  hasModified = true;

  console.log('hello from draw_4536251');
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
  
  const chordElements = document.querySelectorAll('.chord-group .chord .chord-svg');
  console.log(chordElements);
  const ids = Array.from(chordElements).map(element => element.id);
  
  const chords = [F, G, Em, Am, Dm, G, C];
  
  for (let i = 0; i < chords.length; i++) {
    drawChord(ids[i], chords[i]);
  }  
}

export {draw_4536251};